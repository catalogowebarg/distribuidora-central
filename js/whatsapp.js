// ========================================
// OBTENER DATOS CLIENTE
// ========================================

function obtenerDatosCliente() {

  const nombreInput =
    document.getElementById(
      "nombre-cliente"
    );

  const direccionInput =
    document.getElementById(
      "direccion-cliente"
    );

  const entregaSeleccionada =
    document.querySelector(
      'input[name="tipo-entrega"]:checked'
    );

  return {

    nombre:

      nombreInput
        ? nombreInput.value.trim()
        : "",

    entrega:

      entregaSeleccionada
        ? entregaSeleccionada.value
        : "retiro",

    direccion:

      direccionInput
        ? direccionInput.value.trim()
        : ""

  };

}

// ========================================
// VALIDAR PEDIDO
// ========================================

function validarPedido() {

  // CARRITO

  if (carrito.length === 0) {

    alert(
      "El carrito está vacío"
    );

    return false;

  }

  const datos =
    obtenerDatosCliente();

  // NOMBRE

  if (!datos.nombre) {

    alert(
      "Ingresá tu nombre"
    );

    return false;

  }

  // DIRECCIÓN

  if (

    datos.entrega === "delivery" &&
    !datos.direccion

  ) {

    alert(
      "Ingresá una dirección"
    );

    return false;

  }

  return true;

}

// ========================================
// GENERAR MENSAJE
// ========================================

function generarMensajeWhatsApp() {

  const datos =
    obtenerDatosCliente();

  let mensaje = `

🛒 *NUEVO PEDIDO*
━━━━━━━━━━━━━━

`;

  let total = 0;

  // ========================================
  // PRODUCTOS
  // ========================================

  carrito.forEach(item => {

    const producto =
      obtenerProducto(item.id);

    if (!producto) return;

    const subtotal =

      producto.precio *
      item.cantidad;

    total += subtotal;

    mensaje += `

📦 *${producto.nombre}*

• Cantidad: ${item.cantidad}

• Precio: ${CONFIG.catalogo.moneda}${producto.precio}

• Subtotal: ${CONFIG.catalogo.moneda}${subtotal}

`;

  });

  // ========================================
  // TOTAL
  // ========================================

  mensaje += `

━━━━━━━━━━━━━━

💰 *TOTAL:* ${CONFIG.catalogo.moneda}${total}

`;

  // ========================================
  // CLIENTE
  // ========================================

  mensaje += `

👤 *Cliente:* ${datos.nombre}

🚚 *Entrega:* ${datos.entrega}

`;

  // ========================================
  // DIRECCIÓN
  // ========================================

  if (
    datos.entrega === "delivery"
  ) {

    mensaje += `

📍 *Dirección:* ${datos.direccion}

`;

  }

  // ========================================
  // FINAL
  // ========================================

  mensaje += `

Gracias 🙌
`;

  return encodeURIComponent(
    mensaje
  );

}

// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

  if (!validarPedido()) {

    return;

  }

  const telefono =
    CONFIG.negocio.whatsapp;

  const mensaje =
    generarMensajeWhatsApp();

  const url =

    `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(
    url,
    "_blank"
  );

}
