/* =========================================
   BAINANS TOOLS
   LÓGICA V4
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
    document.getElementById(
        "resultadosCompra"
    );

const resultadosGanancia =
    document.getElementById(
        "resultadosGanancia"
    );


const modoBtn =
    document.getElementById("modo");


const copiarBtn =
    document.getElementById("copiar");

const textoCopiar =
    document.getElementById(
        "textoCopiar"
    );


const mostrarResultados =
    document.getElementById(
        "mostrarResultados"
    );

const resultados =
    document.getElementById(
        "resultados"
    );

const cerrarResultados =
    document.getElementById(
        "cerrarResultados"
    );

const themeColor =
    document.getElementById(
        "themeColor"
    );


/* NAVEGACIÓN */

const navInicio =
    document.getElementById(
        "navInicio"
    );

const navOperaciones =
    document.getElementById(
        "navOperaciones"
    );

const navConfiguracion =
    document.getElementById(
        "navConfiguracion"
    );


const toast =
    document.getElementById("toast");


let toastTimer;


/* =========================================
   MODO DE CÁLCULO
========================================= */

let modoGanancia = false;



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

            item.classList.remove(
                "activo"
            );

        });


    if (boton) {

        boton.classList.add(
            "activo"
        );

    }

}


navInicio.addEventListener(
    "click",
    () => {

        activarNav(navInicio);

        const inicio =
            document.getElementById(
                "inicio"
            );

        if (inicio) {

            inicio.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }
);


navOperaciones.addEventListener(
    "click",
    () => {

        activarNav(navOperaciones);

        mostrarToast(
            "📒 Historial de operaciones — próximamente"
        );

    }
);


navConfiguracion.addEventListener(
    "click",
    () => {

        activarNav(navConfiguracion);

        mostrarToast(
            "⚙️ Configuración — próximamente"
        );

    }
);



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
            /^\d{1,3}(\.\d{3})+$/
                .test(texto)
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


    if (
        texto.includes(",")
    ) {

        const partes =
            texto.split(",");

        let entero =
            partes.shift();

        decimal =
            partes.join("");

        entero =
            entero.replace(
                /\./g,
                ""
            );

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


    if (
        texto.includes(".")
    ) {

        const partes =
            texto.split(".");


        if (
            partes.length === 2 &&
            partes[1].length === 3
        ) {

            const numero =
                texto.replace(
                    /\./g,
                    ""
                );

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
            texto.replace(
                /\D/g,
                ""
            ),
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

    return convertirNumero(
        input.value
    );

}



/* =========================================
   API BCV
========================================= */

const BCV_API =
    "https://bcv.today/api/v1/rate.json";


// ============================================================
// BAINANS TOOLS - MERCADO P2P BINANCE
// Usa el 2.º anuncio válido como referencia de mercado
// ============================================================

const P2P_API =
  "https://www.binance.com/bapi/c2c/v1/public/c2c/agent/ad-list";

const P2P_INTERVALO = 2 * 60 * 1000;


// ------------------------------------------------------------
// OBTENER LISTA DE ANUNCIOS
// ------------------------------------------------------------

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

  for (const lista of posiblesListas) {

    if (
      Array.isArray(lista) &&
      lista.length
    ) {
      return lista;
    }

  }

  return [];
}


// ------------------------------------------------------------
// CONVERTIR NÚMEROS P2P
// ------------------------------------------------------------

function numeroP2P(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return 0;
  }

  if (typeof valor === "number") {
    return valor;
  }

  let texto = String(valor)
    .replace(/\s/g, "");

  /*
    Permite:
    982.899
    982,899
    982.899,50
    982,50
  */

  if (
    texto.includes(".") &&
    texto.includes(",")
  ) {
    texto = texto.replace(/\./g, "");
    texto = texto.replace(",", ".");
  } else if (
    texto.includes(",")
  ) {
    texto = texto.replace(",", ".");
  }

  return parseFloat(texto) || 0;
}


// ------------------------------------------------------------
// NORMALIZAR ANUNCIO
// Binance puede devolver algunos datos directamente o dentro
// de "adv". Esta función permite trabajar con ambos formatos.
// ------------------------------------------------------------

function normalizarAnuncioP2P(anuncio) {

  const adv =
    anuncio?.adv ||
    anuncio;

  const advertiser =
    anuncio?.advertiser ||
    {};

  return {

    original: anuncio,

    precio: numeroP2P(
      adv?.price ??
      anuncio?.price
    ),

    disponible: numeroP2P(
      adv?.surplusAmount ??
      adv?.surplus ??
      adv?.availableAmount ??
      adv?.quantity ??
      anuncio?.surplusAmount ??
      anuncio?.surplus ??
      anuncio?.availableAmount ??
      anuncio?.quantity
    ),

    minimoVES: numeroP2P(
      adv?.minSingleTransAmount ??
      adv?.minAmount ??
      adv?.minSingleTrans ??
      anuncio?.minSingleTransAmount ??
      anuncio?.minAmount ??
      anuncio?.minSingleTrans
    ),

    maximoVES: numeroP2P(
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


// ------------------------------------------------------------
// COMPROBAR SI EL ANUNCIO SIRVE PARA EL MONTO
// ------------------------------------------------------------

function anuncioEsUtilizable(anuncio, montoVES) {

  if (!anuncio || anuncio.precio <= 0) {
    return false;
  }

  /*
    Si no tenemos un monto concreto,
    simplemente consideramos válido el anuncio.
  */

  if (!montoVES || montoVES <= 0) {
    return true;
  }

  const precio = anuncio.precio;

  /*
    Cuántos USDT necesitaríamos vender
    para obtener el monto VES.
  */

  const usdtNecesarios =
    montoVES / precio;


  // Comprobar disponibilidad de USDT

  if (
    anuncio.disponible > 0 &&
    usdtNecesarios > anuncio.disponible
  ) {
    return false;
  }


  // Comprobar mínimo de la orden

  if (
    anuncio.minimoVES > 0 &&
    montoVES < anuncio.minimoVES
  ) {
    return false;
  }


  // Comprobar máximo de la orden

  if (
    anuncio.maximoVES > 0 &&
    montoVES > anuncio.maximoVES
  ) {
    return false;
  }


  return true;
}


// ------------------------------------------------------------
// ACTUALIZAR PRECIO P2P
// ------------------------------------------------------------

async function actualizarPrecioP2P() {

  if (!p2pInput) {
    return;
  }

  try {

    if (p2pEstado) {
      p2pEstado.textContent =
        "🔄 Consultando anuncios P2P...";
    }


    /*
      En modo GANANCIA:

      capital = USDT que tenemos
      tasa = BCV + recargo
      montoVES = capital × tasa

      Ese es el monto que intentaremos recuperar
      mediante la venta P2P.
    */

    let montoVESObjetivo = 0;

    if (
      typeof modoGanancia !== "undefined" &&
      modoGanancia &&
      saldoInput
    ) {

      const capital =
        obtenerNumero(saldoInput);

      const bcv =
        obtenerNumero(bcvInput);

      const recargo =
        obtenerNumero(recargoInput);

      const tasa =
        bcv * (1 + recargo / 100);

      montoVESObjetivo =
        capital * tasa;
    }


    // --------------------------------------------------------
    // CONSULTAR BINANCE
    // --------------------------------------------------------

    const url =
      P2P_API +
      "?fiat=VES" +
      "&asset=USDT" +
      "&tradeType=SELL" +
      "&limit=20" +
      "&order=priceDesc" +
      "&_=" +
      Date.now();


    const respuesta = await fetch(url, {

      method: "GET",

      cache: "no-store"

    });


    if (!respuesta.ok) {
      throw new Error(
        "HTTP " + respuesta.status
      );
    }


    const datos =
      await respuesta.json();


    const anunciosBrutos =
      obtenerAnunciosP2P(datos);


    if (!anunciosBrutos.length) {

      throw new Error(
        "Binance no devolvió anuncios P2P"
      );

    }


    // --------------------------------------------------------
    // NORMALIZAR
    // --------------------------------------------------------

    const anuncios =
      anunciosBrutos
        .map(normalizarAnuncioP2P)
        .filter(anuncio =>
          anuncio.precio > 0
        );


    if (!anuncios.length) {

      throw new Error(
        "No se encontraron precios P2P"
      );

    }


    // --------------------------------------------------------
    // FILTRAR ANUNCIOS COMPATIBLES
    // --------------------------------------------------------

    const anunciosValidos =
      anuncios
        .filter(anuncio =>
          anuncioEsUtilizable(
            anuncio,
            montoVESObjetivo
          )
        )
        .sort(
          (a, b) =>
            b.precio - a.precio
        );


    if (!anunciosValidos.length) {

      throw new Error(
        "No hay anuncios compatibles con el monto"
      );

    }


    /*
      ==========================================================
      AQUÍ ESTÁ EL CAMBIO PRINCIPAL

      1.º anuncio = normalmente el precio más alto
      2.º anuncio = referencia que utilizaremos
      3.º anuncio = siguiente alternativa

      Utilizamos el SEGUNDO anuncio válido.

      Si solamente hay uno válido,
      utilizamos el primero.
      ==========================================================
    */

    const posicion =
      anunciosValidos.length >= 2
        ? 1
        : 0;


    const anuncio =
      anunciosValidos[posicion];


    const precio =
      anuncio.precio;


    if (!precio || precio <= 0) {

      throw new Error(
        "El anuncio seleccionado no tiene precio válido"
      );

    }


    // --------------------------------------------------------
    // GUARDAR REFERENCIA
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // MOSTRAR PRECIO EN LA APP
    // --------------------------------------------------------

    p2pInput.value =
      formatoNumero(
        precio,
        2
      );


    // --------------------------------------------------------
    // ESTADO
    // --------------------------------------------------------

    if (p2pEstado) {

      const hora =
        new Date().toLocaleTimeString(
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


    // --------------------------------------------------------
    // RECALCULAR
    // --------------------------------------------------------

    if (
      typeof calcularGanancia === "function" &&
      typeof modoGanancia !== "undefined" &&
      modoGanancia
    ) {

      calcularGanancia();

    } else if (
      typeof calcularCompra === "function"
    ) {

      calcularCompra();

    }


    console.log(
      "P2P seleccionado:",
      anuncio
    );


  } catch (error) {

    console.error(
      "Error P2P:",
      error
    );


    // --------------------------------------------------------
    // USAR ÚLTIMO PRECIO GUARDADO
    // --------------------------------------------------------

    const guardado =
      localStorage.getItem(
        "bainansP2P"
      );


    if (guardado) {

      try {

        const datos =
          JSON.parse(guardado);


        const precio =
          numeroP2P(
            datos.precio
          );


        if (precio > 0) {

          p2pInput.value =
            formatoNumero(
              precio,
              2
            );


          if (p2pEstado) {

            p2pEstado.textContent =
              "🟠 Binance no respondió. Última tasa guardada";

          }


          if (
            typeof calcularGanancia === "function" &&
            typeof modoGanancia !== "undefined" &&
            modoGanancia
          ) {

            calcularGanancia();

          } else if (
            typeof calcularCompra === "function"
          ) {

            calcularCompra();

          }


          return;

        }

      } catch (e) {

        console.error(
          "Error leyendo P2P guardado:",
          e
        );

      }

    }


    // --------------------------------------------------------
    // SIN PRECIO DISPONIBLE
    // --------------------------------------------------------

    if (p2pEstado) {

      p2pEstado.textContent =
        "🔴 No se pudo actualizar P2P";

    }

  }

}


// ------------------------------------------------------------
// CARGAR ÚLTIMO P2P GUARDADO
// ------------------------------------------------------------

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
      JSON.parse(guardado);


    const precio =
      numeroP2P(
        datos.precio
      );


    if (precio > 0) {

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

  } catch (error) {

    console.error(
      "Error cargando P2P:",
      error
    );

  }

}


// ------------------------------------------------------------
// INICIAR ACTUALIZACIÓN P2P
// ------------------------------------------------------------

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

    const datos = {
        tasa: tasa,
        fecha: fecha
    };


    localStorage.setItem(
        "bainansBCV",
        JSON.stringify(datos)
    );

}



/* =========================================
   CARGAR TASA BCV
========================================= */

function cargarTasaGuardada() {

    const guardado =
        localStorage.getItem(
            "bainansBCV"
        );


    if (!guardado) {
        return false;
    }


    try {

        const datos =
            JSON.parse(guardado);


        if (
            datos.tasa &&
            Number(datos.tasa) > 0
        ) {

            bcvInput.value =
                Number(datos.tasa)
                    .toLocaleString(
                        "es-VE",
                        {
                            minimumFractionDigits:
                                2,

                            maximumFractionDigits:
                                4
                        }
                    );


            if (datos.fecha) {

                bcvEstado.textContent =
                    `🟢 Actualizada: ${datos.fecha}`;

                bcvEstado.classList.add(
                    "exito"
                );

            }

            return true;

        }

    }

    catch (error) {

        console.log(
            "No se pudo cargar la tasa BCV."
        );

    }


    return false;

}



/* =========================================
   ACTUALIZAR BCV
========================================= */

async function actualizarTasaBCV() {

    if (
        actualizarBCV.classList.contains(
            "cargando"
        )
    ) {

        return;

    }


    actualizarBCV.classList.add(
        "cargando"
    );

    actualizarBCV.disabled = true;


    bcvEstado.textContent =
        "🔄 Consultando tasa BCV...";


    bcvEstado.classList.remove(
        "exito",
        "error"
    );


    try {

        const respuesta =
            await fetch(
                BCV_API,
                {
                    cache:
                        "no-store"
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                `HTTP ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        const tasa =
            Number(datos.USD);


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
            "";


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


        calcular();

        guardarDatos();


        if (fecha) {

            bcvEstado.textContent =
                `🟢 Actualizada: ${fecha}`;

        }

        else {

            bcvEstado.textContent =
                "🟢 Tasa BCV actualizada";

        }


        bcvEstado.classList.remove(
            "error"
        );

        bcvEstado.classList.add(
            "exito"
        );

    }

    catch (error) {

        console.error(error);

        bcvEstado.textContent =
            "🟠 No se actualizó. Se mantiene la última tasa.";

        bcvEstado.classList.remove(
            "exito"
        );

        bcvEstado.classList.add(
            "error"
        );

    }


    actualizarBCV.classList.remove(
        "cargando"
    );

    actualizarBCV.disabled = false;

}


actualizarBCV.addEventListener(
    "click",
    actualizarTasaBCV
);



/* =========================================
   CAMBIAR MODO
========================================= */

function actualizarInterfazModo() {

    if (modoGanancia) {

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
   CLICK DEL INTERRUPTOR
========================================= */

modoCalculo.addEventListener(
    "click",
    () => {

        modoGanancia =
            !modoGanancia;


        actualizarInterfazModo();

    }
);



/* =========================================
   CALCULADORA PRINCIPAL
========================================= */

function calcular() {

    if (modoGanancia) {

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
        saldo / tasa;


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


    if (p2p > 0) {

        const diferencia =
            p2p -
            costo;


        const porcentaje =
            (
                diferencia /
                p2p
            ) * 100;


        if (diferencia > 0) {

            ahorroP2p.textContent =
                `Ahorras ${formatoNumero(
                    diferencia,
                    4
                )} Bs/USD (${formatoNumero(
                    porcentaje
                )}%)`;

        }

        else if (diferencia < 0) {

            ahorroP2p.textContent =
                `P2P es menor por ${formatoNumero(
                    Math.abs(diferencia),
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
   MODO CALCULAR DATO / GANANCIA
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


    /* TASA BCV + RECARGO */

    const tasa =
        bcv *
        (
            1 +
            recargo / 100
        );


    /* BS NECESARIOS PARA CONSEGUIR
       EL MONTO INDICADO */

    const bs =
        capital *
        tasa;


    /* USDT QUE DEBES VENDER
       EN P2P PARA CONSEGUIR ESOS BS */

    const usdtVenta =
        bs /
        p2p;


    /* COMISIÓN TOTAL */

    const comisionTotal =
        bdv +
        bpay;


    /* USDT QUE QUEDAN
       DESPUÉS DE LAS COMISIONES */

    const usdtRetornados =
        capital *
        (
            1 -
            comisionTotal / 100
        );


    /* GANANCIA */

    const gananciaCalculada =
        usdtRetornados -
        usdtVenta;


    /* ROI */

    const roiCalculado =
        usdtVenta > 0
            ? (
                gananciaCalculada /
                usdtVenta
            ) * 100
            : 0;


    /* HERO */

    heroUsdNumero.textContent =
        formatoNumero(
            usdtRetornados
        );


    heroEstado.textContent =
        "Cantidad estimada que llegará a Binance";


    /* RESULTADOS */

    ganTasaFinal.textContent =
        `${formatoNumero(
            tasa,
            4
        )} Bs/USD`;


    bsNecesarios.textContent =
        `${formatoNumero(
            bs
        )} Bs`;


    tasaBancoBinance.textContent =
        `${formatoNumero(
            comisionTotal
        )}% → ${formatoNumero(
            usdtRetornados
        )} USDT`;


    usdtVentaUsado.textContent =
        `${formatoNumero(
            usdtVenta
        )} USDT`;


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


    roi.textContent =
        `${formatoNumero(
            roiCalculado
        )}%`;


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
   GUARDAR DATOS
========================================= */

function guardarDatos() {

    const datos = {

        saldo:
            saldoInput.value,

        bcv:
            bcvInput.value,

        recargo:
            recargoInput.value,

        bdv:
            bdvInput.value,

        bpay:
            bpayInput.value,

        p2p:
            p2pInput.value

    };


    localStorage.setItem(
        "bainansDatos",
        JSON.stringify(datos)
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


    if (!guardado) return;


    try {

        const datos =
            JSON.parse(
                guardado
            );


        if (datos.saldo) {

            saldoInput.value =
                datos.saldo;

        }


        if (datos.bcv) {

            bcvInput.value =
                datos.bcv;

        }


        if (datos.recargo !== undefined) {

            recargoInput.value =
                datos.recargo;

        }


        if (datos.bdv !== undefined) {

            bdvInput.value =
                datos.bdv;

        }


        if (datos.bpay !== undefined) {

            bpayInput.value =
                datos.bpay;

        }        

    }

    catch (error) {

        console.log(
            "No se pudieron cargar los datos."
        );

    }

}



/* =========================================
   CAMPOS DE ENTRADA
========================================= */

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


/* =========================================
   CAMPOS NUMÉRICOS SIMPLES
========================================= */

[
    recargoInput,
    bdvInput

].forEach(input => {

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

bpayInput.addEventListener(
    "input",
    () => {

        calcular();

        guardarDatos();

    }
);


/* =========================================
   PRECIO P2P MANUAL
========================================= */

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



/* =========================================
   COPIAR RESUMEN
========================================= */

copiarBtn.addEventListener(
    "click",
    async () => {

        let resumen = "";


        if (modoGanancia) {

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

Comisión Banco + BPay:
${tasaBancoBinance.textContent}

USDT de venta usado:
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

Saldo disponible:
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


            copiarBtn.querySelector(
                "span"
            ).textContent = "✅";


            setTimeout(() => {

                copiarBtn.querySelector(
                    "span"
                ).textContent = "📋";


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


    if (oscuro) {

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

    /* MODO OSCURO */

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


    /* DATOS */

    cargarDatos();


    /* BCV */

    if (!bcvInput.value) {

        cargarTasaGuardada();

    }


    /* MODO CALCULADORA */

    const modoCalculoGuardado =
        localStorage.getItem(
            "bainansModoCalculo"
        );


    if (
        modoCalculoGuardado === "ganancia"
    ) {

        modoGanancia = true;

    }

    else {

        modoGanancia = false;

    }


    actualizarInterfazModo();

    calcular();


    /* ==============================
       P2P BINANCE
       ============================== */

    cargarP2PGuardado();

    iniciarActualizacionP2P();

    /* Primera consulta automática */
    actualizarPrecioP2P();

}


/* =========================================
   INICIAR
========================================= */

iniciarApp();
