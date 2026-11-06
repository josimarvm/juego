/* ============================================================
   Vista/PanelJuegoBase.js
   Comportamiento compartido por todos los paneles de juego:
   opciones, validación, mensajes, aciertos y cambio de ronda.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelJuegoBase {
    constructor(raiz) {
      if (!raiz) {
        throw new Error('El panel de juego necesita un elemento raíz.');
      }

      this.raiz = raiz;
      this.pregunta = raiz.querySelector('[data-rol="pregunta"]');
      this.feedback = raiz.querySelector('[data-rol="feedback"]');
      this.aciertosEl = raiz.querySelector('[data-rol="aciertos"]');
      this.botones = Array.from(raiz.querySelectorAll('[data-opcion]'));

      this.mensajes = new Controlador.Mensajes();
      this.opciones = [];
      this.respuesta = null;
      this.aciertos = 0;
      this.temporizador = null;

      this.botones.forEach((boton, indice) => {
        boton.addEventListener('click', () => this.validarRespuesta(indice));
      });

      this._actualizarAciertos();
    }

    /** Cada panel concreto implementa su propia ronda. */
    iniciar() {
      throw new Error('El panel debe implementar iniciar().');
    }

    _prepararRonda({ opciones, respuesta, pregunta }) {
      this.opciones = opciones;
      this.respuesta = respuesta;

      if (this.pregunta && typeof pregunta === 'string') {
        this.pregunta.textContent = pregunta;
      }

      this.botones.forEach((boton, indice) => {
        boton.textContent = String(opciones[indice]);
        boton.disabled = false;
        boton.setAttribute('aria-label', `Respuesta ${indice + 1}: ${opciones[indice]}`);
        boton.classList.remove('boton-respuesta--error');
      });

      this._limpiarTemporizador();
      this._mostrarFeedback('', null);
    }

    validarRespuesta(posicion) {
      if (this.botones[posicion] && this.botones[posicion].disabled) {
        return;
      }

      if (this.opciones[posicion] === this.respuesta) {
        this._cambiarEstadoBotones(false);
        this.aciertos += 1;
        this._actualizarAciertos();
        this._mostrarFeedback(this.mensajes.getMensajeAcierto(), 'acierto');

        this._limpiarTemporizador();
        this.temporizador = window.setTimeout(() => {
          this.temporizador = null;
          this.iniciar();
        }, 1200);
      } else {
        this._mostrarFeedback(this.mensajes.getMensajeFallas(), 'fallo');

        const boton = this.botones[posicion];
        if (boton) {
          boton.classList.remove('boton-respuesta--error');
          void boton.offsetWidth;
          boton.classList.add('boton-respuesta--error');
          window.setTimeout(() => boton.classList.remove('boton-respuesta--error'), 420);
        }
      }
    }

    /**
     * Si se cambia de juego mientras corre la pausa de 1,2 s,
     * se prepara una ronda nueva para que el panel quede utilizable.
     */
    alOcultar() {
      if (this.temporizador !== null) {
        this._limpiarTemporizador();
        this.iniciar();
      }
    }

    _actualizarAciertos() {
      if (this.aciertosEl) {
        this.aciertosEl.textContent = `Aciertos: ${this.aciertos}`;
      }
    }

    _mostrarFeedback(texto, tipo) {
      if (!this.feedback) {
        return;
      }

      this.feedback.textContent = texto;
      this.feedback.classList.toggle(
        'panel-juego__feedback--acierto',
        tipo === 'acierto'
      );
      this.feedback.classList.toggle(
        'panel-juego__feedback--fallo',
        tipo === 'fallo'
      );
    }

    _cambiarEstadoBotones(estado) {
      this.botones.forEach((boton) => {
        boton.disabled = !estado;
      });
    }

    _limpiarTemporizador() {
      if (this.temporizador !== null) {
        window.clearTimeout(this.temporizador);
        this.temporizador = null;
      }
    }
  }

  Vista.PanelJuegoBase = PanelJuegoBase;
})(window);
