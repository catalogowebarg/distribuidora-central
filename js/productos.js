// ========================================
// PRODUCTOS BASE
// ========================================
//
// Este archivo contiene:
//
// • Estructura principal del catálogo
// • IDs únicos de productos
// • Categorías base
// • Imágenes fallback
// • Datos iniciales de respaldo
//
// Google Sheets puede sobrescribir:
//
// • nombre
// • descripción
// • categoría
// • precio
// • stock
// • imagen
//
// ========================================

// ========================================
// CATÁLOGO BASE
// ========================================

const PRODUCTOS = [

  // ========================================
  // CERVEZAS
  // ========================================

  {
    id: "miller-473",

    nombre: "MILLER",

    categoria: "Cervezas",

    imagen: "img/productos/miller.jpg",

    descripcion: "Cajón x12 botellas",

    precio: 42000,

    stock: 10
  },

  {
    id: "brahma-473",

    nombre: "BRAHMA 473ML",

    categoria: "Cervezas",

    imagen: "img/productos/brahma.jpg",

    descripcion: "Cajón x12 botellas",

    precio: 2200,

    stock: 6
  },

  // ========================================
  // GASEOSAS
  // ========================================

  {
    id: "coca-225",

    nombre: "COCA-COLA 2.25L",

    categoria: "Linea Coca Cola",

    imagen: "img/productos/coca-225.jpg",

    descripcion: "Pack x8 unidades",

    precio: 3500,

    stock: 8
  }

];

// ========================================
// NOTA IMPORTANTE
// ========================================
//
// La función:
//
// obtenerProducto()
//
// Se mantiene actualmente en carrito.js.
//
// Más adelante será movida a un
// archivo utilitario compartido para
// evitar duplicaciones entre módulos.
//
// ========================================
