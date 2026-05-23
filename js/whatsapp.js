// ========================================
// DATOS DEL CLIENTE
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
// VALIDACIÓN
// ========================================

function validarPedido() {

  if (carrito.length === 0) {

    alert(
      "El carrito está vacío"
    );

    return false;

  }

  const datos =
    obtenerDatosCliente();

  if (!datos.nombre) {

    alert(
      "Ingresá tu nombre"
    );

    return false;

  }

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
// CALCULAR TOTAL
// ========================================

function calcularTotalPedido() {

  return carrito.reduce(

    (total, item) => {

      const producto =
        obtenerProducto(
          item.id
        );

      if (!producto) {

        return total;

      }

      return (

        total +

        (
          producto.precio *
          item.cantidad
        )

      );

    },

    0

  );

}

// ========================================
// GENERAR BLOQUE PRODUCTOS
// ========================================

function generarBloqueProductos() {

  let texto = "";

  carrito.forEach(item => {

    const producto =
      obtenerProducto(
        item.id
      );

    if (!producto) return;

    const subtotal =

      producto.precio *
      item.cantidad;

    texto += `

📦 *${producto.nombre}*

• Cantidad: ${item.cantidad}

• Precio: ${CONFIG.catalogo.moneda}${producto.precio}

• Subtotal: ${CONFIG.catalogo.moneda}${subtotal}

`;

  });

  return texto;

}

// ========================================
// GENERAR MENSAJE
// ========================================

function generarMensajeWhatsApp() {

  const datos =
    obtenerDatosCliente();

  const total =
    calcularTotalPedido();

  let mensaje = `

🛒 *NUEVO PEDIDO*
━━━━━━━━━━━━━━

`;

  // ========================================
  // PRODUCTOS
  // ========================================

  mensaje +=
    generarBloqueProductos();

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
// URL WHATSAPP
// ========================================

function obtenerUrlWhatsApp() {

  const telefono =
    CONFIG.negocio.whatsapp;

  const mensaje =
    generarMensajeWhatsApp();

  return `https://wa.me/${telefono}?text=${mensaje}`;

}

// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

  if (
    !validarPedido()
  ) {

    return;

  }

  window.open(

    obtenerUrlWhatsApp(),

    "_blank"

  );

}
