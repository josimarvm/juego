/* ============================================================
   Vista/PanelNumero.js
   Dibuja la cantidad de animales indicada, en una cuadrícula.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class PanelNumero {
    constructor(raiz) {
      this.raiz = raiz;
      this.valor = 0;
      this.figura = 0;
      this.animales = [
        'abeja', 'elefante', 'gato', 'leon', 'loro',
        'mono', 'oveja', 'perro', 'pollo', 'zorro'
      ];

      if (this.raiz) {
        this.raiz.setAttribute('role', 'img');
      }
    }

    setValor(valor) {
      this.valor = valor;
      this._render();
    }

    setFigura(figura) {
      this.figura = figura;
      this._render();
    }

    /** Actualiza valor y figura con un solo repintado. */
    actualizar(valor, figura) {
      this.valor = valor;
      this.figura = figura;
      this._render();
    }

    _render() {
      if (!this.raiz) {
        return;
      }

      const valor = Math.max(0, Math.min(Number(this.valor) || 0, 81));
      const animal = this.animales[this.figura] || this.animales[0];
      const columnas = valor <= 9 ? 3 : Math.ceil(Math.sqrt(valor));

      this.raiz.classList.toggle('panel-animales--compacto', valor > 9);
      this.raiz.style.setProperty('--columnas', String(columnas));
      this.raiz.setAttribute(
        'aria-label',
        `${valor} ${valor === 1 ? 'imagen' : 'imágenes'} de ${animal}`
      );

      const fragmento = document.createDocumentFragment();

      for (let i = 0; i < valor; i += 1) {
        const imagen = document.createElement('img');
        imagen.src = Vista.Rutas.animal(animal);
        imagen.alt = '';
        imagen.draggable = false;
        imagen.decoding = 'async';
        fragmento.appendChild(imagen);
      }

      this.raiz.replaceChildren(fragmento);
    }
  }

  Vista.PanelNumero = PanelNumero;
})(window);
