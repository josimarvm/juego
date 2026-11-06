/* ============================================================
   Vista/PanelMultiplicacion.js
   Juego de multiplicaciones con dos grupos de animales.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelMultiplicacion extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelNumero1 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel1"]'));
      this.panelNumero2 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel2"]'));
      this.iniciar();
    }

    iniciar() {
      const multiplicacion = new Controlador.Multiplicacion();

      this.multiplicacion = multiplicacion;
      this.panelNumero1.actualizar(multiplicacion.multiplicando, multiplicacion.figura);
      this.panelNumero2.actualizar(multiplicacion.multiplicador, multiplicacion.figura);
      this._prepararRonda({
        opciones: multiplicacion.opciones,
        respuesta: multiplicacion.resultado,
        pregunta: `${multiplicacion.multiplicando} × ${multiplicacion.multiplicador} = ?`
      });
    }
  }

  Vista.PanelMultiplicacion = PanelMultiplicacion;
})(window);
