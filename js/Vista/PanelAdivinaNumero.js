/* ============================================================
   Vista/PanelAdivinaNumero.js
   Juego: contar los animales y elegir el número correcto.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelAdivinaNumero extends Vista.PanelJuegoBase {
    constructor(raiz) {
      super(raiz);
      this.panelNumero = new Vista.PanelNumero(raiz.querySelector('[data-rol="panel1"]'));
      this.iniciar();
    }

    iniciar() {
      const numero = new Controlador.Numero();

      this.numero = numero;
      this.panelNumero.actualizar(numero.resultado, numero.figura);
      this._prepararRonda({
        opciones: numero.opciones,
        respuesta: numero.resultado,
        pregunta: '¿Cuántos animales hay?'
      });
    }
  }

  Vista.PanelAdivinaNumero = PanelAdivinaNumero;
})(window);
