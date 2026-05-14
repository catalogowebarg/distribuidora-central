// ========================================
// OBTENER DATOS CLIENTE
// ========================================

function obtenerDatosCliente() {

  const nombre =
    document
      .getElementById("nombre-cliente")
      .value
      .trim();

  const entregaSeleccionada =
    document.querySelector(
      'input[name="tipo-entrega"]:checked'
    );

  const direccion =
    document
      .getElementById("direccion-cliente")
      .value
      .trim();

  return {

    nombre,

    entrega:
      entregaSeleccionada
        ? entregaSeleccionada.value
        : "retiro",

    direccion

  };

}

// ========================================
// VALIDAR PEDIDO
// ========================================

function validarPedido() {

  if (carrito.length === 0) {

    alert("El carrito está vacío");

    return false;

  }

  const datos =
    obtenerDatosCliente();

  if (!datos.nombre) {

    alert("Ingresá tu nombre");

    return false;

  }

  if (
    datos.entrega === "delivery" &&
    !datos.direccion
  ) {

    alert("Ingresá una dirección");

    return false;

  }

  return true;

}

// ========================================
// GENERAR MENSAJE
// ========================================
function generarMensajeWhatsApp() {

  let mensaje =
    "🛒 *NUEVO PEDIDO*%0A";

  mensaje +=
    "━━━━━━━━━━━━━━%0A%0A";

  carrito.forEach(item => {

    const subtotal =
      item.precio *
      item.cantidad;

    mensaje +=
      `📦 *${item.nombre}*%0A`;

    mensaje +=
      `Cantidad: ${item.cantidad}%0A`;

    mensaje +=
      `Subtotal: ${CONFIG.catalogo.moneda}${subtotal}%0A%0A`;

  });

  const total =
    carrito.reduce(
      (acc, item) =>
        acc +
        (item.precio * item.cantidad),
      0
    );

  const datos =
    obtenerDatosCliente();

  mensaje +=
    "━━━━━━━━━━━━━━%0A";

  mensaje +=
    `💰 *TOTAL:* ${CONFIG.catalogo.moneda}${total}%0A%0A`;

  mensaje +=
    `👤 *Cliente:* ${datos.nombre}%0A`;

  mensaje +=
    `🚚 *Entrega:* ${datos.entrega}%0A`;

  if (
    datos.entrega === "delivery"
  ) {

    mensaje +=
      `📍 *Dirección:* ${datos.direccion}%0A`;

  }

  mensaje +=
    "%0AGracias 🙌";

  return mensaje;

}

// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

  if (!validarPedido()) return;

  const mensaje =
    generarMensajeWhatsApp();

  const telefono =
    CONFIG.negocio.whatsapp;

  const url =
    `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(
    url,
    "_blank"
  );

}