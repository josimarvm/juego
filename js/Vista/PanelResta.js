/* ============================================================
   Vista/PanelResta.js
   Juego de restas con dos grupos de animales.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelResta extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelNumero1 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel1"]'));
      this.panelNumero2 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel2"]'));
      this.iniciar();
    }

    iniciar() {
      const resta = new Controlador.Resta();

      this.resta = resta;
      this.panelNumero1.actualizar(resta.minuendo, resta.figura);
      this.panelNumero2.actualizar(resta.sustraendo, resta.figura);
      this._prepararRonda({
        opciones: resta.opciones,
        respuesta: resta.resultado,
        pregunta: `${resta.minuendo} - ${resta.sustraendo} = ?`
      });
    }
  }

  Vista.PanelResta = PanelResta;
})(window);
