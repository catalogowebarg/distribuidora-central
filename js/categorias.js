// ========================================
// ICONOS CATEGORÍAS
// ========================================

const ICONOS_CATEGORIAS = {

  "Cervezas":
    "🍺",

  "Linea Coca Cola":
    "🥤",

  "Aguas":
    "💧",

  "Vinos":
    "🍷",

  "Licores":
    "🥃",

  "Snacks":
    "🍟"

};

// ========================================
// ESTADO
// ========================================

let categoriaActual = "";

// ========================================
// NORMALIZAR
// ========================================

function normalizarCategoria(
  categoria
) {

  if (!categoria) {

    return "";

  }

  return categoria
    .trim();

}

// ========================================
// OBTENER CATEGORÍAS
// ========================================

function obtenerCategorias() {

  const categorias =
    PRODUCTOS.map(
      producto =>

        normalizarCategoria(
          producto.categoria
        )
    )

    // ELIMINAR VACÍAS

    .filter(
      categoria =>
        categoria !== ""
    );

  // ELIMINAR DUPLICADAS

  return [
    ...new Set(categorias)
  ];

}

// ========================================
// CAMBIAR CATEGORÍA
// ========================================

function cambiarCategoria(
  categoria
) {

  categoriaActual =
    categoria;

  actualizarEstadoCategorias();

  renderizarProductos();

}

// ========================================
// ACTUALIZAR ESTADO VISUAL
// ========================================

function actualizarEstadoCategorias() {

  const botones =
    document.querySelectorAll(
      "#categorias button"
    );

  botones.forEach(button => {

    const categoria =
      button.dataset.categoria;

    button.classList.toggle(

      "categoria-activa",

      categoria === categoriaActual

    );

  });

}

// ========================================
// CREAR BOTÓN
// ========================================

function crearBotonCategoria(
  categoria
) {

  const button =
    document.createElement(
      "button"
    );

  // DATASET

  button.dataset.categoria =
    categoria;

  // HTML

  button.innerHTML = `

    <span class="icono-categoria">

      ${
        ICONOS_CATEGORIAS[categoria]
        || "📦"
      }

    </span>

    <span>

      ${categoria}

    </span>

  `;

  // ACTIVA

  if (
    categoria === categoriaActual
  ) {

    button.classList.add(
      "categoria-activa"
    );

  }

  // CLICK

  button.addEventListener(
    "click",
    () => {

      cambiarCategoria(
        categoria
      );

    }
  );

  return button;

}

// ========================================
// RENDER
// ========================================

function renderizarCategorias() {

  const contenedor =
    document.getElementById(
      "categorias"
    );

  if (!contenedor) return;

  // LIMPIAR

  contenedor.innerHTML = "";

  // OBTENER

  const categorias =
    obtenerCategorias();

  // INICIAL

  if (
    !categoriaActual &&
    categorias.length > 0
  ) {

    categoriaActual =
      categorias[0];

  }

  // RENDER

  categorias.forEach(categoria => {

    const boton =
      crearBotonCategoria(
        categoria
      );

    contenedor.appendChild(
      boton
    );

  });

}
