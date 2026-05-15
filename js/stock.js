// ========================================
// GOOGLE SHEETS
// ========================================

async function cargarDatosSheets() {

  // ========================================
  // CONFIG
  // ========================================

  if (
    !CONFIG.catalogo.usarGoogleSheets
  ) {

    return;

  }

  try {

    // ========================================
    // FETCH
    // ========================================

    const respuesta =
      await fetch(

        `${CONFIG.catalogo.sheetDB}?nocache=${Date.now()}`,

        {
          method: "GET"
        }

      );

    // ========================================
    // ERROR RESPUESTA
    // ========================================

    if (!respuesta.ok) {

      throw new Error(
        "No se pudo conectar con Google Sheets"
      );

    }

    // ========================================
    // JSON
    // ========================================

    const datos =
      await respuesta.json();

    // ========================================
    // VALIDAR
    // ========================================

    if (!Array.isArray(datos)) {

      throw new Error(
        "Formato inválido de Google Sheets"
      );

    }

    // ========================================
    // ACTUALIZAR
    // ========================================

    actualizarProductos(
      datos
    );

  }

  catch(error) {

    console.error(
      "Error cargando Google Sheets:",
      error
    );

  }

}

// ========================================
// ACTUALIZAR PRODUCTOS
// ========================================

function actualizarProductos(
  datosSheets
) {

  if (
    !Array.isArray(datosSheets)
  ) return;

  // ========================================
  // RECORRER
  // ========================================

  datosSheets.forEach(itemSheet => {

    // ========================================
    // VALIDAR ID
    // ========================================

    if (
      !itemSheet.id ||
      itemSheet.id.trim() === ""
    ) {

      return;

    }

    // ========================================
    // BUSCAR PRODUCTO
    // ========================================

    const producto =
      PRODUCTOS.find(
        item =>
          item.id === itemSheet.id
      );

    // ========================================
    // NO EXISTE
    // ========================================

    if (!producto) {

      console.warn(
        `Producto no encontrado: ${itemSheet.id}`
      );

      return;

    }

    // ========================================
    // NOMBRE
    // ========================================

    if (
      itemSheet.nombre &&
      itemSheet.nombre.trim() !== ""
    ) {

      producto.nombre =
        itemSheet.nombre.trim();

    }

    // ========================================
    // DESCRIPCIÓN
    // ========================================

    if (
      itemSheet.descripcion &&
      itemSheet.descripcion.trim() !== ""
    ) {

      producto.descripcion =
        itemSheet.descripcion.trim();

    }

    // ========================================
    // CATEGORÍA
    // ========================================

    if (
      itemSheet.categoria &&
      itemSheet.categoria.trim() !== ""
    ) {

      producto.categoria =
        itemSheet.categoria.trim();

    }

    // ========================================
    // PRECIO
    // ========================================

    if (
      itemSheet.precio !== ""
    ) {

      const precio =
        Number(
          itemSheet.precio
        );

      if (!isNaN(precio)) {

        producto.precio =
          precio;

      }

    }

    // ========================================
    // STOCK
    // ========================================

    if (
      itemSheet.stock !== ""
    ) {

      const stock =
        Number(
          itemSheet.stock
        );

      if (!isNaN(stock)) {

        producto.stock =
          stock;

      }

    }

    // ========================================
    // IMAGEN
    // ========================================

    if (
      itemSheet.imagen &&
      itemSheet.imagen.trim() !== ""
    ) {

      producto.imagen =
        itemSheet.imagen.trim();

    }

  });

  // ========================================
  // RE-RENDER
  // ========================================

  renderizarCategorias();

  renderizarProductos();

  renderizarCarrito();

  actualizarContadorCarrito();

}
