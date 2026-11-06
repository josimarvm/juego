/* ============================================================
   Vista/PanelInicio.js
   Pantalla de bienvenida. El fondo se define en el CSS.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelInicio {
    constructor(raiz) {
      this.raiz = raiz;
    }

    alMostrar() {
      // La vista de inicio no necesita actualizar datos.
    }
  }

  Vista.PanelInicio = PanelInicio;
})(window);
