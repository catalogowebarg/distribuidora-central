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
// AGREGAR
// ========================================

function agregarAlCarrito(idProducto) {

  const producto =
    PRODUCTOS.find(
      item => item.id === idProducto
    );

  if (!producto) return;

  const variante =
    producto.variantes[0];

  const itemExistente =
    carrito.find(
      item => item.id === idProducto
    );

  if (itemExistente) {

    if (
      itemExistente.cantidad <
      variante.stock
    ) {

      itemExistente.cantidad++;

    }

  } else {

    carrito.push({

      id: producto.id,

      nombre: producto.nombre,

      precio: variante.precio,

      imagen: variante.imagen,

      cantidad: 1,

      stock: variante.stock

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

  if (carrito.length === 0) {

    mensajeVacio.style.display =
      "block";

  } else {

    mensajeVacio.style.display =
      "none";

  }

  let total = 0;

  carrito.forEach(item => {

    total +=
      item.precio *
      item.cantidad;

    const li =
      document.createElement("li");

    li.className =
      "item-carrito";

    li.innerHTML = `

      <img
        src="${item.imagen}"
        alt="${item.nombre}"
      >

      <div class="info-item">

        <h4>
          ${item.nombre}
        </h4>

        <p>
          ${CONFIG.catalogo.moneda}
          ${item.precio}
        </p>

        <div class="controles">

          <button
            onclick="disminuirCantidad('${item.id}')"
          >
            -
          </button>

          <span>
            ${item.cantidad}
          </span>

          <button
            onclick="aumentarCantidad('${item.id}')"
          >
            +
          </button>

        </div>

      </div>

    `;

    lista.appendChild(li);

  });

  totalContainer.textContent =
    `Total: ${CONFIG.catalogo.moneda}${total}`;

}

// ========================================
// AUMENTAR
// ========================================

function aumentarCantidad(idProducto) {

  const item =
    carrito.find(
      item => item.id === idProducto
    );

  if (!item) return;

  if (
    item.cantidad < item.stock
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
      item => item.id === idProducto
    );

  if (!item) return;

  if (item.cantidad > 1) {

    item.cantidad--;

  } else {

    carrito =
      carrito.filter(
        item => item.id !== idProducto
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
// FINALIZAR
// ========================================


// ========================================
// CONTADOR
// ========================================

function actualizarContadorCarrito() {

  const contador =
    document.getElementById(
      "contador-carrito"
    );

  if (!contador) return;

  const total =
    carrito.reduce(
      (acc, item) =>
        acc + item.cantidad,
      0
    );

  contador.textContent =
    total;

}