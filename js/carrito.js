// ========================================
// CARRITO
// ========================================

let carrito =
  JSON.parse(
    localStorage.getItem(
      "carrito"
    )
  ) || [];

// ========================================
// GUARDAR
// ========================================

function guardarCarrito() {

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

}

// ========================================
// OBTENER PRODUCTO
// ========================================

function obtenerProducto(idProducto) {

  return PRODUCTOS.find(
    producto =>
      producto.id === idProducto
  );

}

// ========================================
// AGREGAR
// ========================================

function agregarAlCarrito(idProducto) {

  const producto =
    obtenerProducto(idProducto);

  if (!producto) return;

  const itemExistente =
    carrito.find(
      item =>
        item.id === idProducto
    );

  // ========================================
  // EXISTE
  // ========================================

  if (itemExistente) {

    if (
      itemExistente.cantidad <
      producto.stock
    ) {

      itemExistente.cantidad++;

    }

  }

  // ========================================
  // NUEVO
  // ========================================

  else {

    carrito.push({

      id:
        producto.id,

      cantidad:
        1

    });

  }

  guardarCarrito();

  renderizarCarrito();

  actualizarContadorCarrito();

}

// ========================================
// RENDER
// ========================================

function renderizarCarrito() {

  const lista =
    document.getElementById(
      "lista-carrito"
    );

  const totalContainer =
    document.getElementById(
      "total-carrito"
    );

  const mensajeVacio =
    document.getElementById(
      "carrito-vacio"
    );

  if (
    !lista ||
    !totalContainer ||
    !mensajeVacio
  ) return;

  lista.innerHTML = "";

  // ========================================
  // VACÍO
  // ========================================

  if (carrito.length === 0) {

    mensajeVacio.style.display =
      "block";

  } else {

    mensajeVacio.style.display =
      "none";

  }

  let total = 0;

  // ========================================
  // ITEMS
  // ========================================

  carrito.forEach(item => {

    const producto =
      obtenerProducto(item.id);

    if (!producto) return;

    const subtotal =
      producto.precio *
      item.cantidad;

    total += subtotal;

    const li =
      document.createElement("li");

    li.className =
      "item-carrito";

    li.innerHTML = `

      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
      >

      <div class="info-item">

        <h4>
          ${producto.nombre}
        </h4>

        <p>
          ${CONFIG.catalogo.moneda}
          ${producto.precio}
        </p>

        <div class="controles">

          <button
            onclick="disminuirCantidad('${producto.id}')"
          >
            -
          </button>

          <span>
            ${item.cantidad}
          </span>

          <button
            onclick="aumentarCantidad('${producto.id}')"
          >
            +
          </button>

        </div>

      </div>

    `;

    lista.appendChild(li);

  });

  // ========================================
  // TOTAL
  // ========================================

  totalContainer.textContent =
    `Total: ${CONFIG.catalogo.moneda}${total}`;

}

// ========================================
// AUMENTAR
// ========================================

function aumentarCantidad(idProducto) {

  const item =
    carrito.find(
      item =>
        item.id === idProducto
    );

  const producto =
    obtenerProducto(idProducto);

  if (
    !item ||
    !producto
  ) return;

  if (
    item.cantidad <
    producto.stock
  ) {

    item.cantidad++;

  }

  guardarCarrito();

  renderizarCarrito();

  actualizarContadorCarrito();

}

// ========================================
// DISMINUIR
// ========================================

function disminuirCantidad(idProducto) {

  const item =
    carrito.find(
      item =>
        item.id === idProducto
    );

  if (!item) return;

  // ========================================
  // RESTAR
  // ========================================

  if (item.cantidad > 1) {

    item.cantidad--;

  }

  // ========================================
  // ELIMINAR
  // ========================================

  else {

    carrito =
      carrito.filter(
        item =>
          item.id !== idProducto
      );

  }

  guardarCarrito();

  renderizarCarrito();

  actualizarContadorCarrito();

}

// ========================================
// VACIAR
// ========================================

function vaciarCarrito() {

  carrito = [];

  guardarCarrito();

  renderizarCarrito();

  actualizarContadorCarrito();

}

// ========================================
// CONTADOR + BARRA
// ========================================

function actualizarContadorCarrito() {

  const contadorInferior =
    document.getElementById(
      "contador-bottom"
    );

  const barra =
    document.getElementById(
      "barra-flotante"
    );

  const barraCantidad =
    document.getElementById(
      "barra-cantidad"
    );

  const barraTotal =
    document.getElementById(
      "barra-total"
    );

  const totalCantidad =
    carrito.reduce(
      (acc, item) =>
        acc + item.cantidad,
      0
    );

  const totalPrecio =
    carrito.reduce(
      (acc, item) => {

        const producto =
          obtenerProducto(item.id);

        if (!producto) return acc;

        return (
          acc +
          (
            producto.precio *
            item.cantidad
          )
        );

      },
      0
    );

  // ========================================
  // CONTADOR NAVBAR
  // ========================================

  if (contadorInferior) {

    contadorInferior.textContent =
      totalCantidad;

    contadorInferior.style.display =
      totalCantidad > 0
        ? "flex"
        : "none";

  }

  // ========================================
  // BARRA FLOTANTE
  // ========================================

  if (
    barra &&
    barraCantidad &&
    barraTotal
  ) {

    if (totalCantidad > 0) {

      barra.style.display =
        "flex";

      barraCantidad.textContent =
        `${totalCantidad} producto${totalCantidad > 1 ? "s" : ""} en el carrito`;

      barraTotal.textContent =
        `Total: ${CONFIG.catalogo.moneda}${totalPrecio}`;

    }

    else {

      barra.style.display =
        "none";

    }

  }

}
