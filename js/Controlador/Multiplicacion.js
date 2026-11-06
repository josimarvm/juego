/* ============================================================
   Controlador/Multiplicacion.js
   Genera una multiplicación del 1 al 9, una figura y cuatro
   opciones de respuesta.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});
  const Aleatorio = Controlador.Aleatorio;

  class Multiplicacion {
    constructor() {
      this.multiplicando = Aleatorio.entre(1, 9);
      this.multiplicador = Aleatorio.entre(1, 9);
      this.figura = Aleatorio.entero(10);
      this.resultado = this.multiplicando * this.multiplicador;
      this.opciones = Aleatorio.opciones(this.resultado, 81, 1);
    }
  }

  Controlador.Multiplicacion = Multiplicacion;
})(window);
