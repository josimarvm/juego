/* ============================================================
   Controlador/Suma.js
   Genera una suma con dos sumandos del 1 al 9, una figura y
   cuatro opciones de respuesta.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});
  const Aleatorio = Controlador.Aleatorio;

  class Suma {
    constructor() {
      this.sumando1 = Aleatorio.entre(1, 9);
      this.sumando2 = Aleatorio.entre(1, 9);
      this.figura = Aleatorio.entero(10);
      this.resultado = this.sumando1 + this.sumando2;
      this.opciones = Aleatorio.opciones(this.resultado, 20, 1);
    }
  }

  Controlador.Suma = Suma;
})(window);
