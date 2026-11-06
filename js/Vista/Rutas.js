/* ============================================================
   Vista/Rutas.js
   Centraliza las rutas de los recursos gráficos.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  Vista.Rutas = {
    imagenes: 'Recursos/imagenes',

    animal(nombre) {
      return `${this.imagenes}/animales/${nombre}.png`;
    },

    letra(letra) {
      return `${this.imagenes}/letras/${encodeURIComponent(letra)}.png`;
    },

    operador(nombre) {
      return `${this.imagenes}/fondo/${nombre}.png`;
    }
  };
})(window);
