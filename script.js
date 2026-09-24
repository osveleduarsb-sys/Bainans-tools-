/* =========================================
   BAINANS TOOLS
   LÓGICA V5
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const saldoInput =
    document.getElementById("saldo");

const saldoLabel =
    document.getElementById("saldoLabel");

const bcvInput =
    document.getElementById("bcv");

const actualizarBCV =
    document.getElementById("actualizarBCV");

const bcvEstado =
    document.getElementById("bcvEstado");

const recargoInput =
    document.getElementById("recargo");

const bdvInput =
    document.getElementById("bdv");

const bpayInput =
    document.getElementById("bpay");

const p2pInput =
    document.getElementById("p2p");

const actualizarP2P =
    document.getElementById("actualizarP2P");

const p2pEstado =
    document.getElementById("p2pEstado");

const datosTitulo =
    document.getElementById("datosTitulo");

const modoCalculo =
    document.getElementById("modoCalculo");

const heroUsdNumero =
    document.getElementById("heroUsdNumero");

const heroEstado =
    document.getElementById("heroEstado");


/* RESULTADOS COMPRA */

const tasaFinal =
    document.getElementById("tasaFinal");

const usdComprados =
    document.getElementById("usdComprados");

const comisionBdv =
    document.getElementById("comisionBdv");

const despuesBdv =
    document.getElementById("despuesBdv");

const comisionBpay =
    document.getElementById("comisionBpay");

const usdFinales =
    document.getElementById("usdFinales");

const costoReal =
    document.getElementById("costoReal");

const ahorroP2p =
    document.getElementById("ahorroP2p");


/* RESULTADOS GANANCIA */

const ganTasaFinal =
    document.getElementById("ganTasaFinal");

const bsNecesarios =
    document.getElementById("bsNecesarios");

const tasaBancoBinance =
    document.getElementById("tasaBancoBinance");

const usdtVentaUsado =
    document.getElementById("usdtVentaUsado");

const ganancia =
    document.getElementById("ganancia");

const roi =
    document.getElementById("roi");


const estado =
    document.getElementById("estado");

const resultadosCompra =
    document.getElementById("resultadosCompra");

const resultadosGanancia =
    document.getElementById("resultadosGanancia");

const modoBtn =
    document.getElementById("modo");

const copiarBtn =
    document.getElementById("copiar");

const textoCopiar =
    document.getElementById("textoCopiar");

const mostrarResultados =
    document.getElementById("mostrarResultados");

const resultados =
    document.getElementById("resultados");

const cerrarResultados =
    document.getElementById("cerrarResultados");

const themeColor =
    document.getElementById("themeColor");


/* NAVEGACIÓN */

const navInicio =
    document.getElementById("navInicio");

const navOperaciones =
    document.getElementById("navOperaciones");

const navConfiguracion =
    document.getElementById("navConfiguracion");


const toast =
    document.getElementById("toast");

let toastTimer;


/* =========================================
   MODO DE CÁLCULO
========================================= */

let modoGanancia = false;


/* =========================================
   INTERVALOS
========================================= */

const P2P_INTERVALO =
    2 * 60 * 1000;


/*
   BCV se revisará cada 6 horas.
   Además se actualizará al abrir la app
   cuando la tasa guardada no sea de hoy.
*/

const BCV_INTERVALO =
    6 * 60 * 60 * 1000;


/* =========================================
   TOAST
========================================= */

function mostrarToast(mensaje) {

    if (!toast) return;

    toast.textContent = mensaje;

    toast.classList.add("visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("visible");

    }, 2500);

}


/* =========================================
   NAVEGACIÓN
========================================= */

function activarNav(boton) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("activo");

        });


    if (boton) {

        boton.classList.add("activo");

    }

}


if (navInicio) {

    navInicio.addEventListener(
        "click",
        () => {

            activarNav(navInicio);

            const inicio =
                document.getElementById("inicio");

            if (inicio) {

                inicio.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


if (navOperaciones) {

    navOperaciones.addEventListener(
        "click",
        () => {

            activarNav(navOperaciones);

            mostrarToast(
                "📒 Historial de operaciones — próximamente"
            );

        }
    );

}


if (navConfiguracion) {

    navConfiguracion.addEventListener(
        "click",
        () => {

            activarNav(navConfiguracion);

            mostrarToast(
                "⚙️ Configuración — próximamente"
            );

        }
    );

}


/* =========================================
   FORMATO DE NÚMEROS
========================================= */

function formatoNumero(
    numero,
    decimales = 2
) {

    return Number(numero).toLocaleString(
        "es-VE",
        {
            minimumFractionDigits:
                decimales,

            maximumFractionDigits:
                decimales
        }
    );

}


/* =========================================
   CONVERTIR NÚMERO
========================================= */

function convertirNumero(valor) {

    if (!valor) return 0;

    let texto =
        String(valor).trim();

    texto =
        texto.replace(/\s/g, "");


    if (
        texto.includes(".") &&
        texto.includes(",")
    ) {

        texto =
            texto
                .replace(/\./g, "")
                .replace(",", ".");

    }

    else if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(",", ".");

    }

    else if (
        texto.includes(".")
    ) {

        if (
            /^\d{1,3}(\.\d{3})+$/.test(texto)
        ) {

            texto =
                texto.replace(/\./g, "");

        }

    }


    const numero =
        parseFloat(texto);


    return Number.isFinite(numero)
        ? numero
        : 0;

}


/* =========================================
   FORMATEAR ENTRADA
========================================= */

function formatearEntrada(valor) {

    if (!valor) return "";

    let texto =
        String(valor);

    texto =
        texto.replace(
            /[^\d.,]/g,
            ""
        );

    if (!texto) return "";


    let decimal = "";


    if (texto.includes(",")) {

        const partes =
            texto.split(",");

        let entero =
            partes.shift();

        decimal =
            partes.join("");

        entero =
            entero.replace(/\./g, "");

        if (!entero) {
            entero = "0";
        }

        entero =
            Number(entero)
                .toLocaleString(
                    "es-VE",
                    {
                        maximumFractionDigits:
                            0
                    }
                );

        return decimal !== ""
            ? `${entero},${decimal}`
            : `${entero},`;

    }


    if (texto.includes(".")) {

        const partes =
            texto.split(".");


        if (
            partes.length === 2 &&
            partes[1].length === 3
        ) {

            const numero =
                texto.replace(/\./g, "");

            return Number(numero)
                .toLocaleString(
                    "es-VE",
                    {
                        maximumFractionDigits:
                            0
                    }
                );

        }


        if (
            partes.length === 2 &&
            partes[1].length < 3
        ) {

            const entero =
                partes[0]
                    .replace(/\./g, "");

            const decimal =
                partes[1];

            const enteroFormateado =
                Number(entero)
                    .toLocaleString(
                        "es-VE",
                        {
                            maximumFractionDigits:
                                0
                        }
                    );

            return `${enteroFormateado}.${decimal}`;

        }

    }


    const numero =
        parseInt(
            texto.replace(/\D/g, ""),
            10
        );


    if (
        !Number.isFinite(numero)
    ) {

        return "";

    }


    return numero.toLocaleString(
        "es-VE",
        {
            maximumFractionDigits:
                0
        }
    );

}


/* =========================================
   OBTENER NÚMERO
========================================= */

function obtenerNumero(input) {

    if (!input) return 0;

    return convertirNumero(
        input.value
    );

}


/* =========================================
   API BCV
========================================= */

const BCV_API =
    "https://bcv.today/api/v1/rate.json";


/* =========================================
   API P2P BINANCE
========================================= */

const P2P_API =
    "https://www.binance.com/bapi/c2c/v1/public/c2c/agent/ad-list";


/* =========================================
   P2P — CONVERTIR NÚMERO
========================================= */

function numeroP2P(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {

        return 0;

    }


    if (
        typeof valor === "number"
    ) {

        return valor;

    }


    let texto =
        String(valor)
            .replace(/\s/g, "");


    if (
        texto.includes(".") &&
        texto.includes(",")
    ) {

        texto =
            texto
                .replace(/\./g, "")
                .replace(",", ".");

    }

    else if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(",", ".");

    }


    return parseFloat(texto) || 0;

}


/* =========================================
   OBTENER LISTA DE ANUNCIOS
========================================= */

function obtenerAnunciosP2P(respuesta) {

    const posiblesListas = [

        respuesta?.data,

        respuesta?.data?.data,

        respuesta?.data?.ads,

        respuesta?.data?.list,

        respuesta?.data?.items,

        respuesta?.ads,

        respuesta?.list

    ];


    for (
        const lista of posiblesListas
    ) {

        if (
            Array.isArray(lista) &&
            lista.length
        ) {

            return lista;

        }

    }


    return [];

}


/* =========================================
   NORMALIZAR ANUNCIO P2P
========================================= */

function normalizarAnuncioP2P(anuncio) {

    const adv =
        anuncio?.adv ||
        anuncio;

    const advertiser =
        anuncio?.advertiser ||
        {};


    return {

        original: anuncio,


        precio:
            numeroP2P(
                adv?.price ??
                anuncio?.price
            ),


        disponible:
            numeroP2P(
                adv?.surplusAmount ??
                adv?.surplus ??
                adv?.availableAmount ??
                adv?.quantity ??
                anuncio?.surplusAmount ??
                anuncio?.surplus ??
                anuncio?.availableAmount ??
                anuncio?.quantity
            ),


        minimoVES:
            numeroP2P(
                adv?.minSingleTransAmount ??
                adv?.minAmount ??
                adv?.minSingleTrans ??
                anuncio?.minSingleTransAmount ??
                anuncio?.minAmount ??
                anuncio?.minSingleTrans
            ),


        maximoVES:
            numeroP2P(
                adv?.maxSingleTransAmount ??
                adv?.maxAmount ??
                adv?.maxSingleTrans ??
                anuncio?.maxSingleTransAmount ??
                anuncio?.maxAmount ??
                anuncio?.maxSingleTrans
            ),


        comerciante:
            advertiser?.nickName ||
            advertiser?.nickname ||
            adv?.nickName ||
            adv?.nickname ||
            anuncio?.nickName ||
            anuncio?.nickname ||
            anuncio?.merchantName ||
            anuncio?.userName ||
            "Anuncio P2P",


        adNo:
            adv?.advNo ||
            adv?.adNo ||
            anuncio?.advNo ||
            anuncio?.adNo ||
            ""

    };

}


/* =========================================
   COMPROBAR ANUNCIO
========================================= */

function anuncioEsUtilizable(
    anuncio,
    montoVES
) {

    if (
        !anuncio ||
        anuncio.precio <= 0
    ) {

        return false;

    }


    if (
        !montoVES ||
        montoVES <= 0
    ) {

        return true;

    }


    const usdtNecesarios =
        montoVES /
        anuncio.precio;


    /* DISPONIBILIDAD */

    if (
        anuncio.disponible > 0 &&
        usdtNecesarios >
        anuncio.disponible
    ) {

        return false;

    }


    /* MÍNIMO */

    if (
        anuncio.minimoVES > 0 &&
        montoVES <
        anuncio.minimoVES
    ) {

        return false;

    }


    /* MÁXIMO */

    if (
        anuncio.maximoVES > 0 &&
        montoVES >
        anuncio.maximoVES
    ) {

        return false;

    }


    return true;

}


/* =========================================
   ACTUALIZAR PRECIO P2P
========================================= */

async function actualizarPrecioP2P() {

    if (!p2pInput) return;


    if (
        actualizarP2P?.classList.contains(
            "cargando"
        )
    ) {

        return;

    }


    try {

        if (actualizarP2P) {

            actualizarP2P.classList.add(
                "cargando"
            );

            actualizarP2P.disabled = true;

        }


        if (p2pEstado) {

            p2pEstado.textContent =
                "🔄 Consultando anuncios P2P...";

        }


        /* =====================================
           MONTO VES OBJETIVO
        ===================================== */

        let montoVESObjetivo = 0;


        if (
            modoGanancia &&
            saldoInput
        ) {

            const capital =
                obtenerNumero(
                    saldoInput
                );

            const bcv =
                obtenerNumero(
                    bcvInput
                );

            const recargo =
                obtenerNumero(
                    recargoInput
                );


            const tasa =
                bcv *
                (
                    1 +
                    recargo / 100
                );


            montoVESObjetivo =
                capital * tasa;

        }


        /* =====================================
           CONSULTA BINANCE
        ===================================== */

        const url =
            P2P_API +
            "?fiat=VES" +
            "&asset=USDT" +
            "&tradeType=SELL" +
            "&limit=20" +
            "&order=priceDesc" +
            "&_=" +
            Date.now();


        const respuesta =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "HTTP " +
                respuesta.status
            );

        }


        const datos =
            await respuesta.json();


        const anunciosBrutos =
            obtenerAnunciosP2P(
                datos
            );


        if (
            !anunciosBrutos.length
        ) {

            throw new Error(
                "Binance no devolvió anuncios P2P"
            );

        }


        /* =====================================
           NORMALIZAR
        ===================================== */

        const anuncios =
            anunciosBrutos
                .map(
                    normalizarAnuncioP2P
                )
                .filter(
                    anuncio =>
                        anuncio.precio > 0
                );


        if (
            !anuncios.length
        ) {

            throw new Error(
                "No se encontraron precios P2P"
            );

        }


        /* =====================================
           FILTRAR COMPATIBLES
        ===================================== */

        const anunciosValidos =
            anuncios
                .filter(
                    anuncio =>
                        anuncioEsUtilizable(
                            anuncio,
                            montoVESObjetivo
                        )
                )
                .sort(
                    (a, b) =>
                        b.precio -
                        a.precio
                );


        if (
            !anunciosValidos.length
        ) {

            throw new Error(
                "No hay anuncios compatibles con el monto"
            );

        }


        /*
            Utilizamos el segundo anuncio válido
            como referencia de mercado.

            Si solamente existe uno compatible,
            utilizamos ese.
        */

        const posicion =
            anunciosValidos.length >= 2
                ? 1
                : 0;


        const anuncio =
            anunciosValidos[
                posicion
            ];


        const precio =
            anuncio.precio;


        if (
            !precio ||
            precio <= 0
        ) {

            throw new Error(
                "Precio P2P inválido"
            );

        }


        /* =====================================
           GUARDAR
        ===================================== */

        localStorage.setItem(
            "bainansP2P",
            JSON.stringify({

                precio: precio,

                comerciante:
                    anuncio.comerciante,

                adNo:
                    anuncio.adNo,

                posicion:
                    posicion + 1,

                totalValidos:
                    anunciosValidos.length,

                fecha:
                    new Date().toISOString()

            })
        );


        /* =====================================
           MOSTRAR
        ===================================== */

        p2pInput.value =
            formatoNumero(
                precio,
                2
            );


        if (p2pEstado) {

            const hora =
                new Date()
                    .toLocaleTimeString(
                        "es-VE",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


            p2pEstado.textContent =
                "🟢 Mercado P2P actualizado: " +
                hora;

        }


        calcular();


    }

    catch (error) {

        console.error(
            "Error P2P:",
            error
        );


        const guardado =
            localStorage.getItem(
                "bainansP2P"
            );


        if (guardado) {

            try {

                const datos =
                    JSON.parse(
                        guardado
                    );


                const precio =
                    numeroP2P(
                        datos.precio
                    );


                if (
                    precio > 0
                ) {

                    p2pInput.value =
                        formatoNumero(
                            precio,
                            2
                        );


                    if (p2pEstado) {

                        p2pEstado.textContent =
                            "🟠 Binance no respondió. Última tasa guardada";

                    }


                    calcular();


                    return;

                }

            }

            catch (e) {

                console.error(
                    "Error leyendo P2P guardado:",
                    e
                );

            }

        }


        if (p2pEstado) {

            p2pEstado.textContent =
                "🔴 No se pudo actualizar P2P";

        }

    }

    finally {

        if (actualizarP2P) {

            actualizarP2P.classList.remove(
                "cargando"
            );

            actualizarP2P.disabled =
                false;

        }

    }

}


/* =========================================
   CARGAR P2P GUARDADO
========================================= */

function cargarP2PGuardado() {

    const guardado =
        localStorage.getItem(
            "bainansP2P"
        );


    if (
        !guardado ||
        !p2pInput
    ) {

        return;

    }


    try {

        const datos =
            JSON.parse(
                guardado
            );


        const precio =
            numeroP2P(
                datos.precio
            );


        if (
            precio > 0
        ) {

            p2pInput.value =
                formatoNumero(
                    precio,
                    2
                );


            if (p2pEstado) {

                p2pEstado.textContent =
                    "🟠 Última tasa P2P guardada";

            }

        }

    }

    catch (error) {

        console.error(
            "Error cargando P2P:",
            error
        );

    }

}


/* =========================================
   INICIAR P2P
========================================= */

function iniciarActualizacionP2P() {

    if (actualizarP2P) {

        actualizarP2P.addEventListener(
            "click",
            actualizarPrecioP2P
        );

    }


    setInterval(
        actualizarPrecioP2P,
        P2P_INTERVALO
    );

}


/* =========================================
   GUARDAR TASA BCV
========================================= */

function guardarTasaBCV(
    tasa,
    fecha
) {

    localStorage.setItem(
        "bainansBCV",
        JSON.stringify({

            tasa: tasa,

            fecha: fecha

        })
    );

}


/* =========================================
   FECHA LOCAL ACTUAL
========================================= */

function fechaHoy() {

    const ahora =
        new Date();

    const año =
        ahora.getFullYear();

    const mes =
        String(
            ahora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            ahora.getDate()
        ).padStart(2, "0");


    return `${año}-${mes}-${dia}`;

}


/* =========================================
   CARGAR TASA BCV GUARDADA
========================================= */

function cargarTasaGuardada() {

    const guardado =
        localStorage.getItem(
            "bainansBCV"
        );


    if (!guardado) {

        return null;

    }


    try {

        const datos =
            JSON.parse(
                guardado
            );


        if (
            datos.tasa &&
            Number(datos.tasa) > 0
        ) {

            bcvInput.value =
                Number(
                    datos.tasa
                ).toLocaleString(
                    "es-VE",
                    {
                        minimumFractionDigits:
                            2,

                        maximumFractionDigits:
                            4
                    }
                );


            if (
                datos.fecha
            ) {

                bcvEstado.textContent =
                    `🟢 Actualizada: ${datos.fecha}`;

                bcvEstado.classList.add(
                    "exito"
                );

            }


            return datos;

        }

    }

    catch (error) {

        console.error(
            "No se pudo cargar la tasa BCV:",
            error
        );

    }


    return null;

}


/* =========================================
   ACTUALIZAR BCV
========================================= */

async function actualizarTasaBCV() {

    if (
        !actualizarBCV
    ) {

        return;

    }


    if (
        actualizarBCV.classList.contains(
            "cargando"
        )
    ) {

        return;

    }


    try {

        actualizarBCV.classList.add(
            "cargando"
        );

        actualizarBCV.disabled =
            true;


        if (bcvEstado) {

            bcvEstado.textContent =
                "🔄 Consultando tasa BCV...";

            bcvEstado.classList.remove(
                "exito",
                "error"
            );

        }


        const respuesta =
            await fetch(
                BCV_API,
                {
                    cache: "no-store"
                }
            );


        if (
            !respuesta.ok
        ) {

            throw new Error(
                `HTTP ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        const tasa =
            Number(
                datos.USD
            );


        if (
            !Number.isFinite(tasa) ||
            tasa <= 0
        ) {

            throw new Error(
                "Tasa BCV inválida"
            );

        }


        const fecha =
            datos.effective_date ||
            datos.date ||
            fechaHoy();


        bcvInput.value =
            tasa.toLocaleString(
                "es-VE",
                {
                    minimumFractionDigits:
                        2,

                    maximumFractionDigits:
                        4
                }
            );


        guardarTasaBCV(
            tasa,
            fecha
        );


        if (bcvEstado) {

            bcvEstado.textContent =
                `🟢 Actualizada: ${fecha}`;

            bcvEstado.classList.remove(
                "error"
            );

            bcvEstado.classList.add(
                "exito"
            );

        }


        calcular();

        guardarDatos();

    }

    catch (error) {

        console.error(
            "Error BCV:",
            error
        );


        if (bcvEstado) {

            bcvEstado.textContent =
                "🟠 No se actualizó. Se mantiene la última tasa.";

            bcvEstado.classList.remove(
                "exito"
            );

            bcvEstado.classList.add(
                "error"
            );

        }

    }

    finally {

        actualizarBCV.classList.remove(
            "cargando"
        );

        actualizarBCV.disabled =
            false;

    }

}


/* =========================================
   INICIAR BCV AUTOMÁTICO
========================================= */

function iniciarActualizacionBCV() {

    if (actualizarBCV) {

        actualizarBCV.addEventListener(
            "click",
            actualizarTasaBCV
        );

    }


    /*
       Revisar automáticamente cada 6 horas.
    */

    setInterval(
        actualizarTasaBCV,
        BCV_INTERVALO
    );

}


/* =========================================
   DATOS POR MODO
========================================= */

function guardarDatos() {

    const datosGuardados =
        JSON.parse(
            localStorage.getItem(
                "bainansDatos"
            ) || "{}"
        );


    datosGuardados.bcv =
        bcvInput.value;

    datosGuardados.recargo =
        recargoInput.value;

    datosGuardados.bdv =
        bdvInput.value;

    datosGuardados.bpay =
        bpayInput.value;

    datosGuardados.p2p =
        p2pInput.value;


    /*
       Cada modo tiene su propio saldo.
    */

    if (modoGanancia) {

        datosGuardados.saldoGanancia =
            saldoInput.value;

    }

    else {

        datosGuardados.saldoCompra =
            saldoInput.value;

    }


    /*
       Compatibilidad con la versión anterior.
    */

    datosGuardados.saldo =
        saldoInput.value;


    localStorage.setItem(
        "bainansDatos",
        JSON.stringify(
            datosGuardados
        )
    );

}


/* =========================================
   CARGAR DATOS
========================================= */

function cargarDatos() {

    const guardado =
        localStorage.getItem(
            "bainansDatos"
        );


    if (!guardado) {

        return;

    }


    try {

        const datos =
            JSON.parse(
                guardado
            );


        /*
           Datos compartidos
        */

        if (
            datos.bcv
        ) {

            bcvInput.value =
                datos.bcv;

        }


        if (
            datos.recargo !== undefined
        ) {

            recargoInput.value =
                datos.recargo;

        }


        if (
            datos.bdv !== undefined
        ) {

            bdvInput.value =
                datos.bdv;

        }


        if (
            datos.bpay !== undefined
        ) {

            bpayInput.value =
                datos.bpay;

        }


        if (
            datos.p2p &&
            p2pInput
        ) {

            p2pInput.value =
                datos.p2p;

        }


        /*
           SALDO INDEPENDIENTE
           PARA CADA MODO
        */

        if (
            modoGanancia
        ) {

            if (
                datos.saldoGanancia
            ) {

                saldoInput.value =
                    datos.saldoGanancia;

            }

            else if (
                datos.saldo
            ) {

                /*
                   Migración del saldo antiguo.
                */

                saldoInput.value =
                    datos.saldo;

            }

        }

        else {

            if (
                datos.saldoCompra
            ) {

                saldoInput.value =
                    datos.saldoCompra;

            }

            else if (
                datos.saldo
            ) {

                saldoInput.value =
                    datos.saldo;

            }

        }

    }

    catch (error) {

        console.error(
            "No se pudieron cargar los datos:",
            error
        );

    }

}


/* =========================================
   CAMPOS DE ENTRADA
========================================= */

if (saldoInput) {

    saldoInput.addEventListener(
        "input",
        () => {

            saldoInput.value =
                formatearEntrada(
                    saldoInput.value
                );


            saldoInput.setSelectionRange(
                saldoInput.value.length,
                saldoInput.value.length
            );


            calcular();

            guardarDatos();

        }
    );

}


if (bcvInput) {

    bcvInput.addEventListener(
        "input",
        () => {

            bcvInput.value =
                formatearEntrada(
                    bcvInput.value
                );


            bcvInput.setSelectionRange(
                bcvInput.value.length,
                bcvInput.value.length
            );


            calcular();

            guardarDatos();

        }
    );

}


/* =========================================
   CAMPOS NUMÉRICOS
========================================= */

[
    recargoInput,
    bdvInput

].forEach(input => {

    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            calcular();

            guardarDatos();

        }
    );

});


/* =========================================
   BPAY
========================================= */

if (bpayInput) {

    bpayInput.addEventListener(
        "input",
        () => {

            calcular();

            guardarDatos();

        }
    );

}


/* =========================================
   P2P MANUAL
========================================= */

if (p2pInput) {

    p2pInput.addEventListener(
        "input",
        () => {

            p2pInput.value =
                formatearEntrada(
                    p2pInput.value
                );


            p2pInput.setSelectionRange(
                p2pInput.value.length,
                p2pInput.value.length
            );


            calcular();

            guardarDatos();

        }
    );

}


/* =========================================
   MODO DE CÁLCULO
========================================= */

function actualizarInterfazModo() {

    if (
        modoGanancia
    ) {

        datosTitulo.innerHTML =
            `<span class="section-icon">📊</span>
             Calcular dato`;


        saldoLabel.textContent =
            "Cuánto gano con:";


        saldoInput.placeholder =
            "Ej. 400 USDT";


        modoCalculo.classList.add(
            "activo"
        );


        heroEstado.textContent =
            "Ingresa el monto, BCV y precio P2P";


        resultadosCompra.style.display =
            "none";


        resultadosGanancia.style.display =
            "grid";


        textoCopiar.textContent =
            "Copiar cálculo";


        localStorage.setItem(
            "bainansModoCalculo",
            "ganancia"
        );

    }

    else {

        datosTitulo.innerHTML =
            `<span class="section-icon">📥</span>
             Datos de compra`;


        saldoLabel.textContent =
            "Saldo disponible (Bs)";


        saldoInput.placeholder =
            "Ej. 170.557";


        modoCalculo.classList.remove(
            "activo"
        );


        resultadosCompra.style.display =
            "grid";


        resultadosGanancia.style.display =
            "none";


        textoCopiar.textContent =
            "Copiar resumen";


        localStorage.setItem(
            "bainansModoCalculo",
            "compra"
        );

    }


    calcular();

}


/* =========================================
   CAMBIAR MODO
========================================= */

modoCalculo.addEventListener(
    "click",
    () => {

        /*
           Primero guardamos el saldo
           del modo actual.
        */

        guardarDatos();


        /*
           Cambiamos de modo.
        */

        modoGanancia =
            !modoGanancia;


        /*
           Cargamos el saldo propio
           del nuevo modo.
        */

        cargarDatos();


        actualizarInterfazModo();

        calcular();

    }
);


/* =========================================
   CALCULADORA
========================================= */

function calcular() {

    if (
        modoGanancia
    ) {

        calcularGanancia();

    }

    else {

        calcularCompra();

    }

}


/* =========================================
   MODO COMPRA
========================================= */

function calcularCompra() {

    const saldo =
        obtenerNumero(
            saldoInput
        );

    const bcv =
        obtenerNumero(
            bcvInput
        );

    const recargo =
        obtenerNumero(
            recargoInput
        );

    const bdv =
        obtenerNumero(
            bdvInput
        );

    const bpay =
        obtenerNumero(
            bpayInput
        );

    const p2p =
        obtenerNumero(
            p2pInput
        );


    if (
        saldo <= 0 ||
        bcv <= 0
    ) {

        limpiarCompra();

        heroEstado.textContent =
            "Ingresa el saldo y la tasa BCV";

        estado.textContent =
            "⚪ Esperando cálculo";

        return;

    }


    const tasa =
        bcv *
        (
            1 +
            recargo / 100
        );


    const usd =
        saldo /
        tasa;


    const comisionBDV =
        usd *
        (
            bdv / 100
        );


    const despuesBDV =
        usd -
        comisionBDV;


    const comisionBPay =
        despuesBDV *
        (
            bpay / 100
        );


    const usdQueLlegan =
        despuesBDV -
        comisionBPay;


    const costo =
        saldo /
        usdQueLlegan;


    heroUsdNumero.textContent =
        formatoNumero(
            usdQueLlegan
        );


    heroEstado.textContent =
        "Cantidad estimada que llegará a Binance";


    tasaFinal.textContent =
        `${formatoNumero(
            tasa,
            4
        )} Bs/USD`;


    usdComprados.textContent =
        `${formatoNumero(
            usd
        )} USD`;


    comisionBdv.textContent =
        `${formatoNumero(
            comisionBDV
        )} USD`;


    despuesBdv.textContent =
        `${formatoNumero(
            despuesBDV
        )} USD`;


    comisionBpay.textContent =
        `${formatoNumero(
            comisionBPay
        )} USD`;


    usdFinales.textContent =
        `${formatoNumero(
            usdQueLlegan
        )} USD`;


    costoReal.textContent =
        `${formatoNumero(
            costo,
            4
        )} Bs/USD`;


    if (
        p2p > 0
    ) {

        const diferencia =
            p2p -
            costo;


        const porcentaje =
            (
                diferencia /
                p2p
            ) * 100;


        if (
            diferencia > 0
        ) {

            ahorroP2p.textContent =
                `Ahorras ${formatoNumero(
                    diferencia,
                    4
                )} Bs/USD (${formatoNumero(
                    porcentaje
                )}%)`;

        }

        else if (
            diferencia < 0
        ) {

            ahorroP2p.textContent =
                `P2P es menor por ${formatoNumero(
                    Math.abs(
                        diferencia
                    ),
                    4
                )} Bs/USD`;

        }

        else {

            ahorroP2p.textContent =
                "Mismo costo que P2P";

        }

    }

    else {

        ahorroP2p.textContent =
            "Ingresa precio P2P";

    }


    estado.textContent =
        "🟢 Cálculo actualizado";

}


/* =========================================
   MODO CALCULAR DATO
========================================= */

function calcularGanancia() {

    const capital =
        obtenerNumero(
            saldoInput
        );

    const bcv =
        obtenerNumero(
            bcvInput
        );

    const recargo =
        obtenerNumero(
            recargoInput
        );

    const bdv =
        obtenerNumero(
            bdvInput
        );

    const bpay =
        obtenerNumero(
            bpayInput
        );

    const p2p =
        obtenerNumero(
            p2pInput
        );


    if (
        capital <= 0 ||
        bcv <= 0 ||
        p2p <= 0
    ) {

        limpiarGanancia();

        heroEstado.textContent =
            "Ingresa monto, BCV y precio P2P";

        estado.textContent =
            "⚪ Esperando datos";

        return;

    }


    /* =====================================
       TASA FINAL
    ===================================== */

    const tasa =
        bcv *
        (
            1 +
            recargo / 100
        );


    /* =====================================
       BS NECESARIOS
    ===================================== */

    const bs =
        capital *
        tasa;


    /* =====================================
       USDT QUE SE VENDEN EN P2P
    ===================================== */

    const usdtVenta =
        bs /
        p2p;


    /* =====================================
       COMISIÓN DEL BANCO
    =====================================

       Se calcula sobre el capital inicial.

       Ejemplo:
       310 USDT × 1,5% = 4,65 USDT
    */

    const comisionBancoUSD =
        capital *
        (
            bdv / 100
        );


    const despuesBanco =
        capital -
        comisionBancoUSD;


    /* =====================================
       COMISIÓN BPAY
    =====================================

       Se calcula sobre lo que queda
       después de la comisión bancaria.

       Ejemplo:
       305,35 × 4,1% = 12,52 USDT
    */

    const comisionBPayUSD =
        despuesBanco *
        (
            bpay / 100
        );


    const usdtRetornados =
        despuesBanco -
        comisionBPayUSD;


    /* =====================================
       GANANCIA
    ===================================== */

    const gananciaCalculada =
        usdtRetornados -
        usdtVenta;


    /* =====================================
       ROI
    =====================================

       ROI = ganancia / capital inicial × 100

       Esto corrige el cálculo anterior,
       que utilizaba usdtVenta como base.
    */

    const roiCalculado =
        capital > 0
            ? (
                gananciaCalculada /
                capital
            ) * 100
            : 0;


    /* =====================================
       HERO
    ===================================== */

    heroUsdNumero.textContent =
        formatoNumero(
            usdtRetornados
        );


    heroEstado.textContent =
        "Cantidad estimada que llegará a Binance";


    /* =====================================
       RESULTADOS
    ===================================== */

    ganTasaFinal.textContent =
        `${formatoNumero(
            tasa,
            4
        )} Bs/USD`;


    bsNecesarios.textContent =
        `${formatoNumero(
            bs
        )} Bs`;


    /*
       AHORA MUESTRA SOLO
       LA COMISIÓN DEL BANCO
    */

    tasaBancoBinance.textContent =
        `${formatoNumero(
            comisionBancoUSD
        )} USD`;


    /*
       AHORA MUESTRA SOLO
       LA COMISIÓN DE BPAY
    */

    usdtVentaUsado.textContent =
        `${formatoNumero(
            comisionBPayUSD
        )} USD`;


    /* =====================================
       GANANCIA
    ===================================== */

    if (
        gananciaCalculada >= 0
    ) {

        ganancia.textContent =
            `+${formatoNumero(
                gananciaCalculada
            )} USDT`;

    }

    else {

        ganancia.textContent =
            `${formatoNumero(
                gananciaCalculada
            )} USDT`;

    }


    /* =====================================
       ROI
    ===================================== */

    roi.textContent =
        `${formatoNumero(
            roiCalculado
        )}%`;


    /* =====================================
       ESTADO
    ===================================== */

    if (
        gananciaCalculada >= 0
    ) {

        estado.textContent =
            `🟢 Ganancia estimada: ${formatoNumero(
                gananciaCalculada
            )} USDT`;

    }

    else {

        estado.textContent =
            `🔴 Resultado negativo: ${formatoNumero(
                Math.abs(
                    gananciaCalculada
                )
            )} USDT`;

    }

}


/* =========================================
   LIMPIAR COMPRA
========================================= */

function limpiarCompra() {

    heroUsdNumero.textContent =
        "0,00";

    tasaFinal.textContent =
        "--";

    usdComprados.textContent =
        "--";

    comisionBdv.textContent =
        "--";

    despuesBdv.textContent =
        "--";

    comisionBpay.textContent =
        "--";

    usdFinales.textContent =
        "--";

    costoReal.textContent =
        "--";

    ahorroP2p.textContent =
        "--";

}


/* =========================================
   LIMPIAR GANANCIA
========================================= */

function limpiarGanancia() {

    heroUsdNumero.textContent =
        "0,00";

    ganTasaFinal.textContent =
        "--";

    bsNecesarios.textContent =
        "--";

    tasaBancoBinance.textContent =
        "--";

    usdtVentaUsado.textContent =
        "--";

    ganancia.textContent =
        "--";

    roi.textContent =
        "--";

}


/* =========================================
   COPIAR RESUMEN
========================================= */

copiarBtn.addEventListener(
    "click",
    async () => {

        let resumen = "";


        if (
            modoGanancia
        ) {

            resumen = `

BAINANS TOOLS

CÁLCULO DE GANANCIA

Capital:
${saldoInput.value || "No indicado"} USDT

Tasa BCV:
${bcvInput.value || "No indicada"} Bs/USD

Recargo Banco:
${recargoInput.value || "0"}%

Tasa final:
${ganTasaFinal.textContent}

Bs necesarios:
${bsNecesarios.textContent}

Comisión Banco:
${tasaBancoBinance.textContent}

Comisión BPay:
${usdtVentaUsado.textContent}

Ganancia:
${ganancia.textContent}

ROI:
${roi.textContent}

USD que llegarán a Binance:
${heroUsdNumero.textContent} USD

Precio P2P:
${p2pInput.value || "No indicado"} Bs

            `.trim();

        }

        else {

            resumen = `

BAINANS TOOLS

SALDO DISPONIBLE:
${saldoInput.value || "No indicado"} Bs

Tasa BCV:
${bcvInput.value || "No indicada"} Bs/USD

Tasa final:
${tasaFinal.textContent}

USD comprados:
${usdComprados.textContent}

Comisión BDV:
${comisionBdv.textContent}

Después de BDV:
${despuesBdv.textContent}

Comisión BPay:
${comisionBpay.textContent}

USD finales:
${usdFinales.textContent}

USD que llegarán a Binance:
${heroUsdNumero.textContent} USD

Costo real por USD:
${costoReal.textContent}

Ahorro frente al P2P:
${ahorroP2p.textContent}

            `.trim();

        }


        try {

            await navigator.clipboard.writeText(
                resumen
            );


            textoCopiar.textContent =
                "Resumen copiado";


            const icono =
                copiarBtn.querySelector(
                    "span"
                );


            if (icono) {

                icono.textContent =
                    "✅";

            }


            setTimeout(() => {

                if (icono) {

                    icono.textContent =
                        "📋";

                }


                textoCopiar.textContent =
                    modoGanancia
                        ? "Copiar cálculo"
                        : "Copiar resumen";

            }, 2000);

        }

        catch (error) {

            alert(
                "No se pudo copiar el resumen."
            );

        }

    }
);


/* =========================================
   MODO OSCURO
========================================= */

function actualizarModo() {

    const oscuro =
        document.body.classList.contains(
            "dark"
        );


    if (
        oscuro
    ) {

        modoBtn.textContent =
            "☀️";

        modoBtn.title =
            "Cambiar a modo claro";


        if (themeColor) {

            themeColor.setAttribute(
                "content",
                "#080c10"
            );

        }

    }

    else {

        modoBtn.textContent =
            "🌙";

        modoBtn.title =
            "Cambiar a modo oscuro";


        if (themeColor) {

            themeColor.setAttribute(
                "content",
                "#f5f7fb"
            );

        }

    }

}


modoBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const oscuro =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "bainansModo",
            oscuro
                ? "dark"
                : "light"
        );


        actualizarModo();

    }
);


/* =========================================
   RESULTADOS
========================================= */

mostrarResultados.addEventListener(
    "click",
    () => {

        resultados.classList.toggle(
            "visible"
        );


        if (
            resultados.classList.contains(
                "visible"
            )
        ) {

            mostrarResultados.innerHTML =
                "<span>☰</span> Ocultar resultado";

        }

        else {

            mostrarResultados.innerHTML =
                "<span>☰</span> Resultado";

        }

    }
);


cerrarResultados.addEventListener(
    "click",
    () => {

        resultados.classList.remove(
            "visible"
        );


        mostrarResultados.innerHTML =
            "<span>☰</span> Resultado";

    }
);


/* =========================================
   INICIAR APP
========================================= */

function iniciarApp() {


    /* =====================================
       MODO OSCURO
    ===================================== */

    const modoGuardado =
        localStorage.getItem(
            "bainansModo"
        );


    if (
        modoGuardado === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    actualizarModo();



    /* =====================================
       MODO CALCULADORA
    ===================================== */

    const modoCalculoGuardado =
        localStorage.getItem(
            "bainansModoCalculo"
        );


    modoGanancia =
        modoCalculoGuardado ===
        "ganancia";



    /* =====================================
       DATOS
    ===================================== */

    cargarDatos();



    /* =====================================
       BCV
    ===================================== */

    const tasaGuardada =
        cargarTasaGuardada();


    /*
       Si la tasa guardada no corresponde
       al día de hoy, se actualiza sola.
    */

    const hoy =
        fechaHoy();


    if (
        !tasaGuardada ||
        tasaGuardada.fecha !== hoy
    ) {

        actualizarTasaBCV();

    }


    iniciarActualizacionBCV();



    /* =====================================
       INTERFAZ
    ===================================== */

    actualizarInterfazModo();

    calcular();



    /* =====================================
       P2P
    ===================================== */

    cargarP2PGuardado();

    iniciarActualizacionP2P();


    /*
       Primera consulta automática.
    */

    actualizarPrecioP2P();

}


/* =========================================
   INICIAR
========================================= */

iniciarApp();
