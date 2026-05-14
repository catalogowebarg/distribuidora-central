// ========================================
// ICONOS CATEGORÍAS
// ========================================

const ICONOS_CATEGORIAS = {

  "Cervezas": "🍺",

  "Linea Coca Cola": "🥤",

  "Aguas": "💧",

  "Vinos": "🍷",

  "Licores": "🥃",

  "Snacks": "🍟"

};

// ========================================
// ESTADO
// ========================================

let categoriaActual = null;

// ========================================
// OBTENER CATEGORÍAS
// ========================================

function obtenerCategorias() {

  const categorias =
    PRODUCTOS.map(
      producto =>
        producto.categoria
    );

  return [
    ...new Set(categorias)
  ];

}

// ========================================
// RENDERIZAR
// ========================================

function renderizarCategorias() {

  const contenedor =
    document.getElementById(
      "categorias"
    );

  if (!contenedor) return;

  contenedor.innerHTML = "";

  const categorias =
    obtenerCategorias();

  // ========================================
  // CATEGORÍA INICIAL
  // ========================================

  if (
    !categoriaActual &&
    categorias.length > 0
  ) {

    categoriaActual =
      categorias[0];

  }

  // ========================================
  // CREAR BOTONES
  // ========================================

  categorias.forEach(categoria => {

    const button =
      document.createElement(
        "button"
      );

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

    // EVENTO

    button.addEventListener(
      "click",
      () => {

        categoriaActual =
          categoria;

        renderizarCategorias();

        renderizarProductos();

      }
    );

    contenedor.appendChild(
      button
    );

  });

}