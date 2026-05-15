// ========================================
// PRODUCTOS BASE
// ========================================
//
// Este archivo define:
//
// ✔ ids
// ✔ categorías
// ✔ imágenes fallback
// ✔ estructura del catálogo
//
// Google Sheets actualiza:
//
// ✔ precio
// ✔ stock
// ✔ descripción
// ✔ nombre (opcional)
//
// ========================================

const PRODUCTOS = [

  // ========================================
  // MILLER
  // ========================================

  {

    id:
      "miller-473",

    nombre:
      "MILLER",

    categoria:
      "Cervezas",

    imagen:
      "img/productos/miller.jpg",

    // ========================================
    // FALLBACKS
    // ========================================

    descripcion:
      "Cajón x12 botellas",

    precio:
      42000,

    stock:
      10

  },

  // ========================================
  // COCA COLA
  // ========================================

  {

    id:
      "coca-225",

    nombre:
      "COCA-COLA 2.25L",

    categoria:
      "Linea Coca Cola",

    imagen:
      "img/productos/coca-225.jpg",

    // ========================================
    // FALLBACKS
    // ========================================

    descripcion:
      "Pack x8 unidades",

    precio:
      3500,

    stock:
      8

  },

  // ========================================
  // BRAHMA
  // ========================================

  {

    id:
      "brahma-473",

    nombre:
      "BRAHMA 473ML",

    categoria:
      "Cervezas",

    imagen:
      "img/productos/brahma.jpg",

    // ========================================
    // FALLBACKS
    // ========================================

    descripcion:
      "Cajón x12 botellas",

    precio:
      2200,

    stock:
      6

  }

];

// ========================================
// OBTENER PRODUCTO
// ========================================

function obtenerProducto(
  id
) {

  return PRODUCTOS.find(
    producto =>
      producto.id === id
  );

}
