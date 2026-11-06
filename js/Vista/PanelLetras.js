/* ============================================================
   Vista/PanelLetras.js
   Dibuja la cuadrícula de 4 x 4 letras.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelLetras {
    constructor(raiz) {
      this.raiz = raiz;
      this.matrizLetras = null;
    }

    setMatrizLetras(matrizLetras) {
      this.matrizLetras = matrizLetras;
      this._render();
    }

    _render() {
      if (!this.raiz || !this.matrizLetras) {
        return;
      }

      const fragmento = document.createDocumentFragment();
      const filas = this.matrizLetras.length;
      const columnas = this.matrizLetras[0] ? this.matrizLetras[0].length : 0;

      this.raiz.style.gridTemplateColumns = `repeat(${columnas}, minmax(0, 1fr))`;
      this.raiz.setAttribute(
        'aria-label',
        `Cuadrícula de ${filas * columnas} letras`
      );

      this.matrizLetras.forEach((fila) => {
        fila.forEach((letra) => {
          const imagen = document.createElement('img');
          imagen.src = Vista.Rutas.letra(letra);
          imagen.alt = '';
          imagen.draggable = false;
          imagen.decoding = 'async';
          fragmento.appendChild(imagen);
        });
      });

      this.raiz.replaceChildren(fragmento);
    }
  }

  Vista.PanelLetras = PanelLetras;
})(window);
