// ========================================
// CONFIGURACIÓN GLOBAL DE LA PLANTILLA
// ========================================
//
// Toda la personalización del catálogo
// debe realizarse desde este archivo.
//
// Para crear una nueva versión para otro
// cliente normalmente solo será necesario:
//
// • Cambiar datos del negocio
// • Cambiar colores
// • Cambiar banners
// • Cambiar enlaces
// • Cambiar Google Sheets
//
// Sin modificar HTML, CSS o JavaScript.
//
// ========================================

const CONFIG = {

  // ========================================
  // NEGOCIO
  // ========================================

  negocio: {

    nombre:
      "Distribuidora Central",

    subtitulo:
      "Mayorista de bebidas",

    logo:
      "img/logo/logo.png",

    whatsapp:
      "5491138599611"

  },

  // ========================================
  // CONTACTO
  // ========================================

  contacto: {

    email:
      "contacto@distribuidoracentral.com",

    direccion:
      "Buenos Aires, Argentina",

    horario:
      "Lunes a viernes de 08:00 a 18:00 hs. | Sábados de 09:00 a 14:00 hs."

  },

  // ========================================
  // REDES SOCIALES
  // ========================================

  redes: {

    instagram:
      "",

    facebook:
      "",

    tiktok:
      "",

    youtube:
      "",

    sitioWeb:
      ""

  },

  // ========================================
  // IDENTIDAD VISUAL
  // ========================================
  //
  // Utilizado por:
  //
  // • variables.css
  // • app.js
  // • botones
  // • categorías
  // • slider
  // • barra flotante
  //
  // ========================================

  colores: {

    principal:
      "#19642c",

    secundario:
      "#1d5c37",

    acento:
      "#FF2F68",

    fondo:
      "#F7F8FA",

    texto:
      "#1a3520"

  },

  // ========================================
  // BANNERS
  // ========================================

  banners: [

    "img/banners/banner1.jpg",

    "img/banners/banner2.jpg",

    "img/banners/banner3.jpg"

  ],

  // ========================================
  // CATÁLOGO
  // ========================================

  catalogo: {

    moneda:
      "$",

    usarGoogleSheets:
      true,

    sheetDB:
      "https://sheetdb.io/api/v1/qsl7b2o23zlr0"

  },

  // ========================================
  // MÓDULOS VISUALES
  // ========================================

  secciones: {

    mostrarSlider:
      true,

    mostrarBeneficios:
      true,

    mostrarCategorias:
      true,

    mostrarFAQ:
      true,

    mostrarContacto:
      true

  },

  // ========================================
  // FUNCIONALIDADES
  // ========================================

  funciones: {

    buscador:
      true,

    carrito:
      true,

    whatsapp:
      true,

    sliderAutomatico:
      true

  },

  // ========================================
  // BENEFICIOS
  // ========================================
  //
  // Preparado para render dinámico
  // en futuras versiones.
  //
  // ========================================

  beneficios: [

    {
      icono:
        "fa-solid fa-truck",

      titulo:
        "Envíos rápidos",

      descripcion:
        "En CABA y GBA"
    },

    {
      icono:
        "fa-solid fa-circle-dollar-to-slot",

      titulo:
        "Precios mayoristas",

      descripcion:
        "Las mejores ofertas"
    },

    {
      icono:
        "fa-solid fa-boxes-stacked",

      titulo:
        "Stock actualizado",

      descripcion:
        "En tiempo real"
    },

    {
      icono:
        "fa-solid fa-headset",

      titulo:
        "Atención rápida",

      descripcion:
        "Por WhatsApp"
    }

  ]

};
