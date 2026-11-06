/* ============================================================
   Vista/PanelVocal.js
   Juego: contar cuántas vocales hay en la cuadrícula.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelVocal extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelLetras = new Vista.PanelLetras(raiz.querySelector('[data-rol="letras"]'));
      this.iniciar();
    }

    iniciar() {
      const letras = new Controlador.Letras('V');

      this.letras = letras;
      this.panelLetras.setMatrizLetras(letras.matrizLetras);
      this._prepararRonda({
        opciones: letras.opciones,
        respuesta: letras.cantidad
      });
    }
  }

  Vista.PanelVocal = PanelVocal;
})(window);
