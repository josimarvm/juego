/* ============================================================
   Controlador/Aleatorio.js
   Utilidades compartidas por los controladores del juego.
   Esta capa no conoce el DOM: solo genera datos.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});

  const Aleatorio = {
    /** Entero entre 0 (incluido) y max (excluido), como Random.nextInt(max). */
    entero(max) {
      return Math.floor(Math.random() * max);
    },

    /** Entero entre min y max, ambos incluidos. */
    entre(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /** Elige un elemento al azar de una lista. */
    elegir(lista) {
      return lista[this.entero(lista.length)];
    },

    /**
     * Crea las cuatro opciones de respuesta con una sola correcta.
     * Las opciones incorrectas son distintas entre sí y distintas de la correcta.
     */
    opciones(respuestaCorrecta, maximo, minimo) {
      const opciones = new Array(4).fill(null);
      const usados = new Set([respuestaCorrecta]);
      const posicionCorrecta = this.entero(opciones.length);

      opciones[posicionCorrecta] = respuestaCorrecta;

      for (let i = 0; i < opciones.length; i += 1) {
        if (i === posicionCorrecta) {
          continue;
        }

        let valor = this.entre(minimo, maximo);
        let intentos = 0;

        while (usados.has(valor) && intentos < 200) {
          valor = this.entre(minimo, maximo);
          intentos += 1;
        }

        if (usados.has(valor)) {
          valor = this._primerLibre(usados, minimo, maximo);
        }

        opciones[i] = valor;
        usados.add(valor);
      }

      return opciones;
    },

    _primerLibre(usados, minimo, maximo) {
      for (let valor = minimo; valor <= maximo; valor += 1) {
        if (!usados.has(valor)) {
          return valor;
        }
      }
      return minimo;
    }
  };

  Controlador.Aleatorio = Aleatorio;
})(window);
