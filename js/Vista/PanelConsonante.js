/* ============================================================
   Vista/PanelConsonante.js
   Juego: contar cuántas consonantes hay en la cuadrícula.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelConsonante extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelLetras = new Vista.PanelLetras(raiz.querySelector('[data-rol="letras"]'));
      this.iniciar();
    }

    iniciar() {
      const letras = new Controlador.Letras('C');

      this.letras = letras;
      this.panelLetras.setMatrizLetras(letras.matrizLetras);
      this._prepararRonda({
        opciones: letras.opciones,
        respuesta: letras.cantidad
      });
    }
  }

  Vista.PanelConsonante = PanelConsonante;
})(window);
