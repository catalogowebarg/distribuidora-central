// ========================================
// ESTADO GLOBAL
// ========================================

let textoBusqueda = "";

// ========================================
// INICIO APP
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    iniciarConfiguracion();

aplicarTema();

    // GOOGLE SHEETS

    if (
      CONFIG.catalogo.usarGoogleSheets
    ) {

      await cargarDatosSheets();

    }

    // RENDER

    renderizarCategorias();

    renderizarProductos();

    renderizarCarrito();

    actualizarContadorCarrito();

    // EVENTOS

  inicializarEventos();

  inicializarLocalidades();

inicializarSlider();

inicializarCarritoPanel();

inicializarMenu();

inicializarFlujoMobile();

  }
);

// ========================================
// CONFIGURACIÓN
// ========================================

function iniciarConfiguracion() {

  // TÍTULO

  document.title =
    CONFIG.negocio.nombre;

  // NOMBRE NEGOCIO

  const titulo =
    document.querySelector(
      ".negocio-info h1"
    );

  if (titulo) {

    titulo.textContent =
      CONFIG.negocio.nombre;

  }

  // SUBTÍTULO

  const subtitulo =
    document.querySelector(
      ".negocio-info p"
    );

  if (subtitulo) {

    subtitulo.textContent =
      CONFIG.negocio.subtitulo;

  }

  // LOGO

  const logo =
    document.querySelector(
      ".logo"
    );

  if (logo) {

    logo.src =
      CONFIG.negocio.logo;

  }
  const footerCopyright =
  document.getElementById(
    "footer-copyright"
  );

if (footerCopyright) {

  footerCopyright.textContent =

    `© ${new Date().getFullYear()} ${CONFIG.negocio.nombre}`;

}

}
// ========================================
// TEMA DINÁMICO
// ========================================

function aplicarTema() {

  const root =
    document.documentElement;

  if (
    !CONFIG.colores ||
    !root
  ) {
    return;
  }

  // COLORES PRINCIPALES

  root.style.setProperty(
    "--color-principal",
    CONFIG.colores.principal
  );

  root.style.setProperty(
    "--color-principal-hover",
    CONFIG.colores.secundario
  );

  // OPCIONALES

  if (CONFIG.colores.fondo) {

    root.style.setProperty(
      "--color-fondo",
      CONFIG.colores.fondo
    );

  }

  if (CONFIG.colores.texto) {

    root.style.setProperty(
      "--color-texto",
      CONFIG.colores.texto
    );

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

  // ========================================
  // FILTRAR
  // ========================================

  const productosFiltrados =
    PRODUCTOS.filter(producto => {

      const coincideBusqueda =
        producto.nombre
          .toLowerCase()
          .includes(
            textoBusqueda.toLowerCase()
          );

      // BUSCADOR

      if (
        textoBusqueda.trim() !== ""
      ) {

        return coincideBusqueda;

      }

      // CATEGORÍA

      return (
        producto.categoria ===
        categoriaActual
      );

    });

  // ========================================
  // SIN RESULTADOS
  // ========================================

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

  // ========================================
  // RENDER CARDS
  // ========================================

  productosFiltrados.forEach(producto => {

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "card-producto";

    card.innerHTML = `

      <img
        src="${producto.imagen}"
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
              ${producto.precio}

            </p>

            <p class="stock ${
  producto.stock <= 0
    ? "stock-vacio"
    : producto.stock <= 5
      ? "stock-bajo"
      : "stock-ok"
}">

  ${
    producto.stock <= 0
      ? "Sin stock"
      : `Stock ${producto.stock}`
  }

</p>

          </div>

        </div>

        <button
          onclick="agregarAlCarrito('${producto.id}')"
          ${
            producto.stock <= 0
              ? "disabled"
              : ""
          }
        >

          ${
            producto.stock <= 0
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

  inicializarBuscador();

  inicializarBarraFlotante();

  inicializarBotonesCarrito();

  inicializarEntrega();

  inicializarBottomNav();

}

// ========================================
// BUSCADOR
// ========================================

function inicializarBuscador() {

  const buscador =
    document.getElementById(
      "buscador"
    );

  if (!buscador) return;

  // INPUT

  buscador.addEventListener(
    "input",
    e => {

      textoBusqueda =
        e.target.value;

      renderizarProductos();

    }
  );

  // ENTER MOBILE

  buscador.addEventListener(
    "keydown",
    e => {

      if (e.key !== "Enter") return;

      buscador.blur();

      setTimeout(() => {

        const primerProducto =
          document.querySelector(
            ".card-producto"
          );

        if (primerProducto) {

          primerProducto.scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

        }

      }, 120);

    }
  );

}

// ========================================
// BARRA FLOTANTE
// ========================================

function inicializarBarraFlotante() {

  const barraBtn =
    document.getElementById(
      "barra-ver-carrito"
    );

  if (!barraBtn) return;

  barraBtn.addEventListener(
    "click",
    () => {

      const btn =
        document.getElementById(
          "bottom-cart-btn"
        );

      if (btn) {

        btn.click();

      }

    }
  );

}

// ========================================
// BOTONES CARRITO
// ========================================

function inicializarBotonesCarrito() {

  const btnVaciar =
    document.getElementById(
      "btn-vaciar"
    );

  const btnFinalizar =
    document.getElementById(
      "btn-finalizar"
    );

  if (btnVaciar) {

    btnVaciar.addEventListener(
      "click",
      vaciarCarrito
    );

  }

  if (btnFinalizar) {

    btnFinalizar.addEventListener(
      "click",
      finalizarPedido
    );

  }

}

// ========================================
// ENTREGA
// ========================================

function inicializarEntrega() {

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

        if (!direccion) return;

        direccion.style.display =

          (
            radio.value === "delivery" &&
            radio.checked
          )

          ? "block"

          : "none";

      }
    );

  });

}

// ========================================
// PANEL CARRITO
// ========================================

function inicializarCarritoPanel() {

  const panel =
    document.getElementById(
      "seccion-carrito"
    );

  const overlay =
    document.getElementById(
      "overlay-carrito"
    );

  const btnBottom =
    document.getElementById(
      "bottom-cart-btn"
    );

  const btnCerrar =
    document.getElementById(
      "cerrar-carrito"
    );

  if (
    !panel ||
    !overlay
  ) return;

  // ABRIR

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

  // CERRAR

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

  // TOGGLE

  function toggleCarrito() {

    const abierto =
      panel.classList.contains(
        "carrito-abierto"
      );

    abierto
      ? cerrarCarrito()
      : abrirCarrito();

  }

  // BOTÓN NAVBAR

  if (btnBottom) {

    btnBottom.addEventListener(
      "click",
      toggleCarrito
    );

  }

  // BOTÓN X

  if (btnCerrar) {

    btnCerrar.addEventListener(
      "click",
      cerrarCarrito
    );

  }

  // OVERLAY

  overlay.addEventListener(
    "click",
    cerrarCarrito
  );

}

// ========================================
// MENÚ LATERAL
// ========================================

function inicializarMenu() {

  const menu =
    document.getElementById(
      "menu-lateral"
    );

  const overlay =
    document.getElementById(
      "overlay-menu"
    );

  const abrir =
    document.getElementById(
      "menu-btn"
    );

  const cerrar =
    document.getElementById(
      "cerrar-menu"
    );

  if (
    !menu ||
    !overlay ||
    !abrir ||
    !cerrar
  ) return;

  // ABRIR

  function abrirMenu() {

    menu.classList.add(
      "menu-abierto"
    );

    overlay.classList.add(
      "activo"
    );

    document.body.style.overflow =
      "hidden";

  }

  // CERRAR

  function cerrarMenu() {

    menu.classList.remove(
      "menu-abierto"
    );

    overlay.classList.remove(
      "activo"
    );

    document.body.style.overflow =
      "";

  }

  abrir.addEventListener(
    "click",
    abrirMenu
  );

  cerrar.addEventListener(
    "click",
    cerrarMenu
  );

  overlay.addEventListener(
    "click",
    cerrarMenu
  );

}

// ========================================
// FLUJO MOBILE
// ========================================

function inicializarFlujoMobile() {

  const nombreInput =
    document.getElementById(
      "nombre-cliente"
    );

  const direccionInput =
    document.getElementById(
      "direccion-cliente"
    );

  const carritoFooter =
    document.querySelector(
      ".carrito-footer"
    );

  function irAFinalizar() {

    if (document.activeElement) {

      document.activeElement.blur();

    }

    setTimeout(() => {

      if (carritoFooter) {

        carritoFooter.scrollIntoView({

          behavior: "smooth",

          block: "center"

        });

      }

    }, 150);

  }

  // NOMBRE

  if (nombreInput) {

    nombreInput.addEventListener(
      "keydown",
      e => {

        if (e.key === "Enter") {

          e.preventDefault();

          irAFinalizar();

        }

      }
    );

  }

  // DIRECCIÓN

 if (direccionInput) {

  direccionInput.addEventListener(
    "keydown",
    e => {

      if (e.key === "Enter") {

        e.preventDefault();

        irAFinalizar();

      }

    }
  );

}

}

// ========================================
// SLIDER
// ========================================

function inicializarSlider() {

  const track =
    document.querySelector(
      ".slider-track"
    );

  const slides =
    document.querySelectorAll(
      ".slider-track img"
    );

  const dots =
    document.querySelectorAll(
      ".dot"
    );

  const prevBtn =
    document.querySelector(
      ".slider-arrow.prev"
    );

  const nextBtn =
    document.querySelector(
      ".slider-arrow.next"
    );

  if (
    !track ||
    slides.length === 0
  ) return;

  let slideActual = 0;

  let intervalo;

  let touchStartX = 0;

let touchEndX = 0;

  // ========================================
  // ACTUALIZAR
  // ========================================

  function actualizarSlider() {

    track.style.transform =

      `translateX(-${slideActual * 100}%)`;

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === slideActual
      );

    });

  }

  // ========================================
  // SIGUIENTE
  // ========================================

  function siguienteSlide() {

    slideActual++;

    if (
      slideActual >= slides.length
    ) {

      slideActual = 0;

    }

    actualizarSlider();

  }

  // ========================================
  // ANTERIOR
  // ========================================

  function slideAnterior() {

    slideActual--;

    if (
      slideActual < 0
    ) {

      slideActual =
        slides.length - 1;

    }

    actualizarSlider();

  }

  // ========================================
  // AUTOPLAY
  // ========================================

  function iniciarAutoplay() {

    intervalo = setInterval(
      siguienteSlide,
      4000
    );

  }

  function reiniciarAutoplay() {

    clearInterval(intervalo);

    iniciarAutoplay();

  }

  // ========================================
  // BOTONES
  // ========================================

  if (nextBtn) {

    nextBtn.addEventListener(
      "click",
      () => {

        siguienteSlide();

        reiniciarAutoplay();

      }
    );

  }

  if (prevBtn) {

    prevBtn.addEventListener(
      "click",
      () => {

        slideAnterior();

        reiniciarAutoplay();

      }
    );

  }

  // ========================================
  // DOTS
  // ========================================

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        slideActual = index;

        actualizarSlider();

        reiniciarAutoplay();

      }
    );

  });
  // ========================================
  // SWIPE MOBILE
  // ========================================

  track.addEventListener(
    "touchstart",
    e => {

      touchStartX =
        e.changedTouches[0].screenX;

    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    e => {

      touchEndX =
        e.changedTouches[0].screenX;

      manejarSwipe();

    },
    { passive: true }
  );

  function manejarSwipe() {

    const diferencia =
      touchStartX - touchEndX;

    // IZQUIERDA

    if (diferencia > 50) {

      siguienteSlide();

      reiniciarAutoplay();

    }

    // DERECHA

    if (diferencia < -50) {

      slideAnterior();

      reiniciarAutoplay();

    }

  }
  
  // ========================================
  // INICIAR
  // ========================================

  actualizarSlider();

  iniciarAutoplay();

}
// ========================================
// BOTTOM NAV
// ========================================

function inicializarBottomNav() {

  // ========================================
  // BOTÓN CATEGORÍAS
  // ========================================

  const btnCategorias =
    document.getElementById(
      "btn-categorias-nav"
    );

  if (btnCategorias) {

    btnCategorias.addEventListener(
      "click",
      () => {

        const categorias =
          document.getElementById(
            "categorias"
          );

        if (!categorias) return;

        categorias.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }
    );

  }

  // ========================================
  // BOTÓN BUSCAR
  // ========================================

  const btnBuscar =
    document.getElementById(
      "btn-buscar-nav"
    );

  if (btnBuscar) {

    btnBuscar.addEventListener(
      "click",
      () => {

        const buscador =
          document.getElementById(
            "buscador"
          );

        if (!buscador) return;

        buscador.scrollIntoView({

          behavior: "smooth",

          block: "center"

        });

        setTimeout(() => {

          buscador.focus();

        }, 400);

      }
    );

  }

}
// ========================================
// ENVÍOS
// ========================================

function inicializarLocalidades() {

  const select =
    document.getElementById(
      "localidad-cliente"
    );

  if (!select) return;

  obtenerLocalidades()
    .forEach(localidad => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        localidad;

      option.textContent =
        localidad;

      select.appendChild(
        option
      );

    });

  select.addEventListener(
    "change",
    actualizarCostoEnvio
  );

}

function actualizarCostoEnvio() {

  const select =
    document.getElementById(
      "localidad-cliente"
    );

  const costo =
    document.getElementById(
      "costo-envio"
    );

  if (
    !select ||
    !costo
  ) {
    return;
  }

  const valor =
    obtenerCostoEnvio(
      select.value
    );

  costo.textContent =
    `${CONFIG.catalogo.moneda}${valor}`;

}
