// ========================================
// ESTADO GLOBAL
// ========================================

let textoBusqueda = "";

// ========================================
// INICIO
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    iniciarConfiguracion();

    /* ========================================
    CARGAR GOOGLE SHEETS
    ======================================== */

    await cargarDatosSheets();

    renderizarCategorias();

    renderizarProductos();

    renderizarCarrito();

    actualizarContadorCarrito();

    inicializarEventos();

    inicializarCarritoPanel();

  }
);

// ========================================
// CONFIGURACIÓN
// ========================================

function iniciarConfiguracion() {

  document.title =
    CONFIG.negocio.nombre;

  const titulo =
    document.querySelector(
      ".negocio-info h1"
    );

  if (titulo) {

    titulo.textContent =
      CONFIG.negocio.nombre;

  }

  const subtitulo =
    document.querySelector(
      ".negocio-info p"
    );

  if (subtitulo) {

    subtitulo.textContent =
      CONFIG.negocio.subtitulo;

  }

  const logo =
    document.querySelector(
      ".logo"
    );

  if (logo) {

    logo.src =
      CONFIG.negocio.logo;

  }

  const banner =
    document.getElementById(
      "banner-principal"
    );

  if (banner) {

    banner.src =
      CONFIG.negocio.banner;

  }

}

// ========================================
// RENDER PRODUCTOS
// ========================================

function renderizarProductos() {

  const contenedor =
    document.getElementById(
      "productos"
    );

  if (!contenedor) return;

  contenedor.innerHTML = "";

  const productosFiltrados =
    PRODUCTOS.filter(producto => {

      const coincideBusqueda =
        producto.nombre
          .toLowerCase()
          .includes(
            textoBusqueda.toLowerCase()
          );

      if (
        textoBusqueda.trim() !== ""
      ) {

        return coincideBusqueda;

      }

      return (
        producto.categoria ===
        categoriaActual
      );

    });

  if (
    productosFiltrados.length === 0
  ) {

    contenedor.innerHTML = `

      <p class="sin-resultados">
        No se encontraron productos
      </p>

    `;

    return;

  }

  productosFiltrados.forEach(producto => {

    const variante =
      producto.variantes[0];

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "card-producto";

    card.innerHTML = `

      <img
        src="${variante.imagen}"
        alt="${producto.nombre}"
        class="img-producto"
      >

      <div class="contenido-producto">

        <div class="top-producto">

          <div class="info-producto">

            <h3>
              ${producto.nombre}
            </h3>

            <p class="descripcion">
              ${producto.descripcion}
            </p>

          </div>

          <div class="precio-stock">

            <p class="precio">

              ${CONFIG.catalogo.moneda}
              ${variante.precio}

            </p>

            <p class="stock">

              ${
                variante.stock > 0
                  ? `Stock ${variante.stock}`
                  : "Sin stock"
              }

            </p>

          </div>

        </div>

        <button
          onclick="agregarAlCarrito('${producto.id}')"
          ${
            variante.stock <= 0
              ? "disabled"
              : ""
          }
        >

          ${
            variante.stock <= 0
              ? "Sin stock"
              : "🛒 Agregar"
          }

        </button>

      </div>

    `;

    contenedor.appendChild(
      card
    );

  });

}

// ========================================
// EVENTOS
// ========================================

function inicializarEventos() {

  // BUSCADOR

  const buscador =
    document.getElementById(
      "buscador"
    );

  if (buscador) {

    buscador.addEventListener(
      "input",
      e => {

        textoBusqueda =
          e.target.value;

        renderizarProductos();

      }
    );

  }

  // VACIAR

  const btnVaciar =
    document.getElementById(
      "btn-vaciar"
    );

  if (btnVaciar) {

    btnVaciar.addEventListener(
      "click",
      vaciarCarrito
    );

  }

  // FINALIZAR

  const btnFinalizar =
    document.getElementById(
      "btn-finalizar"
    );

  if (btnFinalizar) {

    btnFinalizar.addEventListener(
      "click",
      finalizarPedido
    );

  }

  // ENTREGA

  const radios =
    document.querySelectorAll(
      'input[name="tipo-entrega"]'
    );

  radios.forEach(radio => {

    radio.addEventListener(
      "change",
      () => {

        const direccion =
          document.getElementById(
            "contenedor-direccion"
          );

        if (
          radio.value === "delivery" &&
          radio.checked
        ) {

          direccion.style.display =
            "block";

        } else {

          direccion.style.display =
            "none";

        }

      }
    );

  });

}

// ========================================
// PANEL CARRITO
// ========================================

function inicializarCarritoPanel() {

  const btnTop =
    document.getElementById(
      "btn-carrito"
    );

  const btnBottom =
    document.getElementById(
      "bottom-cart-btn"
    );

  const panel =
    document.getElementById(
      "seccion-carrito"
    );

  const overlay =
    document.getElementById(
      "overlay-carrito"
    );

  if (!panel || !overlay) return;

  function abrirCarrito() {

    panel.classList.add(
      "carrito-abierto"
    );

    overlay.classList.add(
      "overlay-activo"
    );

    document.body.style.overflow =
      "hidden";

  }

  function cerrarCarrito() {

    panel.classList.remove(
      "carrito-abierto"
    );

    overlay.classList.remove(
      "overlay-activo"
    );

    document.body.style.overflow =
      "";

  }

  function toggleCarrito() {

    const abierto =
      panel.classList.contains(
        "carrito-abierto"
      );

    if (abierto) {

      cerrarCarrito();

    } else {

      abrirCarrito();

    }

  }

  if (btnTop) {

    btnTop.addEventListener(
      "click",
      toggleCarrito
    );

  }

  if (btnBottom) {

    btnBottom.addEventListener(
      "click",
      toggleCarrito
    );

  }

  overlay.addEventListener(
    "click",
    cerrarCarrito
  );

}
