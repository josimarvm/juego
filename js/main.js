/* ============================================================
   main.js
   Punto de entrada de la aplicación.
   ============================================================ */
(function (global) {
  'use strict';

  function iniciarAplicacion() {
    const raiz = document.getElementById('app');

    if (!raiz) {
      return;
    }

    global.juego = new global.Vista.Principal(raiz);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarAplicacion);
  } else {
    iniciarAplicacion();
  }
})(window);
