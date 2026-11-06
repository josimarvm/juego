/* ============================================================
   Vista/PanelSuma.js
   Juego de sumas con dos grupos de animales.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelSuma extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelNumero1 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel1"]'));
      this.panelNumero2 = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel2"]'));
      this.iniciar();
    }

    iniciar() {
      const suma = new Controlador.Suma();

      this.suma = suma;
      this.panelNumero1.actualizar(suma.sumando1, suma.figura);
      this.panelNumero2.actualizar(suma.sumando2, suma.figura);
      this._prepararRonda({
        opciones: suma.opciones,
        respuesta: suma.resultado,
        pregunta: `${suma.sumando1} + ${suma.sumando2} = ?`
      });
    }
  }

  Vista.PanelSuma = PanelSuma;
})(window);
