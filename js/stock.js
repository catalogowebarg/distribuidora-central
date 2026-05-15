// ========================================
// CARGAR DATOS GOOGLE SHEETS
// ========================================

async function cargarDatosSheets() {

  try {

    const respuesta =
     await fetch(
  `${CONFIG.catalogo.sheetDB}?nocache=${Date.now()}`
);

    if (!respuesta.ok) {

      throw new Error(
        "No se pudo conectar con Google Sheets"
      );

    }

    const datos =
      await respuesta.json();

    actualizarProductos(
      datos
    );

  }

  catch(error) {

    console.error(
      "Error cargando Sheets:",
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

  datosSheets.forEach(
    itemSheet => {

      const producto =
        PRODUCTOS.find(
          item =>
            item.id ===
            itemSheet.id
        );

      // SI NO EXISTE EL PRODUCTO

      if (!producto) {

        console.warn(
          `Producto no encontrado: ${itemSheet.id}`
        );

        return;

      }

      /* ========================================
      DATOS GENERALES
      ======================================== */

      if (
        itemSheet.nombre &&
        itemSheet.nombre.trim() !== ""
      ) {

        producto.nombre =
          itemSheet.nombre;

      }

      if (
        itemSheet.descripcion &&
        itemSheet.descripcion.trim() !== ""
      ) {

        producto.descripcion =
          itemSheet.descripcion;

      }

      if (
        itemSheet.categoria &&
        itemSheet.categoria.trim() !== ""
      ) {

        producto.categoria =
          itemSheet.categoria;

      }

      /* ========================================
      VARIANTE
      ======================================== */

      const variante =
        producto.variantes[0];

      // PRECIO

      if (
        itemSheet.precio !== ""
      ) {

        variante.precio =
          Number(
            itemSheet.precio
          );

      }

      // STOCK

      if (
        itemSheet.stock !== ""
      ) {

        variante.stock =
          Number(
            itemSheet.stock
          );

      }

      // IMAGEN

      if (
        itemSheet.imagen &&
        itemSheet.imagen.trim() !== ""
      ) {

        variante.imagen =
          itemSheet.imagen;

      }

    }
  );

  // RE-RENDER

  renderizarCategorias();

  renderizarProductos();

}
