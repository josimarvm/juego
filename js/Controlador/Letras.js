/* ============================================================
   Controlador/Letras.js
   Genera la cuadrícula de letras y la cantidad de vocales o
   consonantes que el jugador debe contar.
   ============================================================ */
(function (global) {
  'use strict';

  const Controlador = (global.Controlador = global.Controlador || {});
  const Aleatorio = Controlador.Aleatorio;

  class Letras {
    constructor(tipo) {
      this.tipo = tipo;
      this.vocales = ['A', 'E', 'I', 'O', 'U'];
      this.consonantes = [
        'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ',
        'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
      ];

      this.matrizLetras = Array.from({ length: 4 }, () => new Array(4).fill(''));

      if (tipo === 'V') {
        this.cantidad = Aleatorio.entre(1, 5);
        this._rellenarMatriz(this.vocales, this.consonantes);
        this.opciones = Aleatorio.opciones(this.cantidad, 5, 1);
      } else if (tipo === 'C') {
        this.cantidad = Aleatorio.entre(1, 10);
        this._rellenarMatriz(this.consonantes, this.vocales);
        this.opciones = Aleatorio.opciones(this.cantidad, 22, 1);
      } else {
        this.cantidad = 0;
        this.opciones = [];
        this._rellenarMatriz(this.vocales, this.consonantes);
      }
    }

    /**
     * Coloca "cantidad" letras del grupo principal en posiciones al azar
     * y completa las casillas restantes con letras del otro grupo.
     */
    _rellenarMatriz(principales, secundarias) {
      const posiciones = [];

      for (let fila = 0; fila < 4; fila += 1) {
        for (let columna = 0; columna < 4; columna += 1) {
          posiciones.push([fila, columna]);
        }
      }

      // Mezcla Fisher-Yates para repartir las letras principales.
      for (let i = posiciones.length - 1; i > 0; i -= 1) {
        const j = Aleatorio.entero(i + 1);
        [posiciones[i], posiciones[j]] = [posiciones[j], posiciones[i]];
      }

      posiciones.forEach(([fila, columna], indice) => {
        if (indice < this.cantidad) {
          this.matrizLetras[fila][columna] = Aleatorio.elegir(principales);
        } else {
          this.matrizLetras[fila][columna] = Aleatorio.elegir(secundarias);
        }
      });
    }
  }

  Controlador.Letras = Letras;
})(window);
