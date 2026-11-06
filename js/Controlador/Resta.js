/* ============================================================
   Controlador/Resta.js
   Genera una resta sin resultados negativos, una figura y
   cuatro opciones de respuesta.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});
  const Aleatorio = Controlador.Aleatorio;

  class Resta {
    constructor() {
      this.minuendo = Aleatorio.entre(1, 9);
      this.sustraendo = Aleatorio.entre(1, 9);
      this.figura = Aleatorio.entero(10);

      // El minuendo siempre debe ser mayor o igual que el sustraendo.
      if (this.minuendo < this.sustraendo) {
        const auxiliar = this.minuendo;
        this.minuendo = this.sustraendo;
        this.sustraendo = auxiliar;
      }

      this.resultado = this.minuendo - this.sustraendo;
      this.opciones = Aleatorio.opciones(this.resultado, 20, 1);
    }
  }

  Controlador.Resta = Resta;
})(window);
