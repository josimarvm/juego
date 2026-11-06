/* ============================================================
   Controlador/Mensajes.js
   Mensajes de ánimo para aciertos y fallos.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});

  class Mensajes {
    constructor() {
      this.posFallas = 0;
      this.aciertos = [
        '¡Muy bien hecho!',
        '¡Excelente trabajo!',
        '¡Eres un genio!',
        '¡Correcto, sigue así!',
        '¡Fantástico!'
      ];
      this.fallas = [
        '¡Casi lo logras, intenta de nuevo!',
        '¡No te rindas, tú puedes!',
        '¡Vamos a intentarlo otra vez!'
      ];
    }

    getMensajeAcierto() {
      return this.aciertos[Controlador.Aleatorio.entero(this.aciertos.length)];
    }

    getMensajeFallas() {
      const mensaje = this.fallas[this.posFallas];
      this.posFallas += 1;
      if (this.posFallas === this.fallas.length) {
        this.posFallas = 0;
      }
      return mensaje;
    }
  }

  Controlador.Mensajes = Mensajes;
})(window);
