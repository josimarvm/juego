/* ============================================================
   Controlador/Numero.js
   Juego "Adivina el número": elige una cantidad de animales,
   una figura y cuatro opciones de respuesta.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});
  const Aleatorio = Controlador.Aleatorio;

  class Numero {
    constructor() {
      this.resultado = Aleatorio.entre(1, 9);
      this.figura = Aleatorio.entero(10);
      this.opciones = Aleatorio.opciones(this.resultado, 19, 0);
    }
  }

  Controlador.Numero = Numero;
})(window);
