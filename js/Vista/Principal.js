/* ============================================================
   Vista/Principal.js
   Ventana principal: crea los paneles, controla el menú y el
   diálogo de salida.
   ============================================================ */
(function (global) {
  'use strict';

  const Vista = (global.Vista = global.Vista || {});

  class Principal {
    constructor(raiz) {
      this.raiz = raiz;
      this.paneles = new Map();
      this.botonesMenu = Array.from(raiz.querySelectorAll('[data-vista]'));
      this.vistaActual = null;
      this.focoAnterior = null;

      this.modal = document.getElementById('modalSalir');
      this.botonSalir = document.getElementById('btnSalir');
      this.btnVolverInicio = document.getElementById('btnVolverInicio');
      this.btnCerrarPestana = document.getElementById('btnCerrarPestana');
      this.notaCerrar = document.getElementById('notaCerrar');

      this.menuLateral = document.getElementById('menuLateral');
      this.botonMenuMovil = document.getElementById('btnMenu');
      this.botonCerrarMenu = document.getElementById('btnCerrarMenu');
      this.veloMenu = document.getElementById('menuVelo');

      this._crearPaneles();
      this._conectarMenu();
      this._conectarMenuMovil();
      this._conectarSalida();
      this.mostrar('inicio');
    }

    _crearPaneles() {
      const definiciones = [
        ['inicio', 'panelInicio', Vista.PanelInicio],
        ['numeros', 'panelAdivinaNumero', Vista.PanelAdivinaNumero],
        ['suma', 'panelSuma', Vista.PanelSuma],
        ['resta', 'panelResta', Vista.PanelResta],
        ['multiplicacion', 'panelMultiplicacion', Vista.PanelMultiplicacion],
        ['vocales', 'panelVocal', Vista.PanelVocal],
        ['consonantes', 'panelConsonante', Vista.PanelConsonante]
      ];

      definiciones.forEach(([clave, id, ClasePanel]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
          this.paneles.set(clave, new ClasePanel(elemento));
        }
      });
    }

    _conectarMenu() {
      this.botonesMenu.forEach((boton) => {
        boton.addEventListener('click', () => {
          this.mostrar(boton.dataset.vista);
        });
      });
    }

    /* ------------------------------------------------------------
       Menú deslizante del móvil y la tablet
       ------------------------------------------------------------ */

    _conectarMenuMovil() {
      if (!this.menuLateral || !this.botonMenuMovil || !this.veloMenu) {
        return;
      }

      this.botonMenuMovil.addEventListener('click', () => {
        if (this.menuLateral.classList.contains('abierto')) {
          this.cerrarMenuMovil(true);
        } else {
          this.abrirMenuMovil();
        }
      });

      this.veloMenu.addEventListener('click', () => this.cerrarMenuMovil(true));

      if (this.botonCerrarMenu) {
        this.botonCerrarMenu.addEventListener('click', () => this.cerrarMenuMovil(true));
      }

      this.menuLateral.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
          evento.preventDefault();
          this.cerrarMenuMovil(true);
          return;
        }

        this._atraparFocoEn(this.menuLateral, evento);
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 820) {
          this.cerrarMenuMovil(false);
        }
      });
    }

    menuMovilAbierto() {
      return Boolean(this.menuLateral && this.menuLateral.classList.contains('abierto'));
    }

    modoMovil() {
      return window.matchMedia('(max-width: 820px), (max-height: 560px)').matches;
    }

    abrirMenuMovil() {
      if (!this.menuLateral || !this.veloMenu || !this.botonMenuMovil || !this.modoMovil()) {
        return;
      }

      this.menuLateral.classList.add('abierto');
      this.raiz.classList.add('menu-abierto');
      this.veloMenu.hidden = false;
      this.botonMenuMovil.setAttribute('aria-expanded', 'true');

      const enfocar =
        this.menuLateral.querySelector('.boton-menu.activo') ||
        this.menuLateral.querySelector('.boton-menu');

      if (enfocar) {
        enfocar.focus({ preventScroll: true });
      }
    }

    cerrarMenuMovil(devolverFoco) {
      if (!this.menuLateral || !this.veloMenu || !this.botonMenuMovil) {
        return;
      }

      const estabaAbierto = this.menuLateral.classList.contains('abierto');

      this.menuLateral.classList.remove('abierto');
      this.raiz.classList.remove('menu-abierto');
      this.veloMenu.hidden = true;
      this.botonMenuMovil.setAttribute('aria-expanded', 'false');

      if (estabaAbierto && devolverFoco) {
        this.botonMenuMovil.focus({ preventScroll: true });
      }
    }

    mostrar(clave) {
      const panelElegido = this.paneles.get(clave);

      if (!panelElegido) {
        return;
      }

      const menuEstabaAbierto = this.menuMovilAbierto();

      this.paneles.forEach((panel, panelClave) => {
        const activo = panelClave === clave;

        if (!activo && panelClave === this.vistaActual && typeof panel.alOcultar === 'function') {
          panel.alOcultar();
        }

        panel.raiz.hidden = !activo;
        if (activo) {
          panel.raiz.scrollTop = 0;
        }
      });

      this.botonesMenu.forEach((boton) => {
        const activo = boton.dataset.vista === clave;

        boton.classList.toggle('activo', activo);
        if (activo) {
          boton.setAttribute('aria-current', 'page');
        } else {
          boton.removeAttribute('aria-current');
        }
      });

      this.vistaActual = clave;

      if (typeof panelElegido.alMostrar === 'function') {
        panelElegido.alMostrar();
      }

      if (menuEstabaAbierto) {
        this.cerrarMenuMovil(false);
        panelElegido.raiz.setAttribute('tabindex', '-1');
        panelElegido.raiz.focus({ preventScroll: true });
      }
    }

    _conectarSalida() {
      if (this.botonSalir) {
        this.botonSalir.addEventListener('click', () => this.abrirSalida());
      }

      if (this.btnVolverInicio) {
        this.btnVolverInicio.addEventListener('click', () => {
          this.cerrarSalida();
          this.mostrar('inicio');
        });
      }

      if (this.btnCerrarPestana) {
        this.btnCerrarPestana.addEventListener('click', () => {
          if (this.notaCerrar) {
            this.notaCerrar.hidden = true;
          }

          window.close();

          window.setTimeout(() => {
            if (this.notaCerrar) {
              this.notaCerrar.hidden = false;
            }
          }, 250);
        });
      }

      if (this.modal) {
        this.modal.addEventListener('click', (evento) => {
          if (evento.target === this.modal) {
            this.cerrarSalida();
          }
        });

        this.modal.addEventListener('keydown', (evento) => this._atraparFoco(evento));
      }

      document.addEventListener('keydown', (evento) => {
        if (evento.key !== 'Escape') {
          return;
        }

        if (this.modal && !this.modal.hidden) {
          this.cerrarSalida();
        } else if (this.menuMovilAbierto()) {
          this.cerrarMenuMovil(true);
        }
      });
    }

    abrirSalida() {
      if (!this.modal) {
        return;
      }

      const menuAbierto = this.menuMovilAbierto();

      this.focoAnterior = menuAbierto ? this.botonMenuMovil : document.activeElement;
      this.cerrarMenuMovil(false);
      this.modal.hidden = false;

      if (this.notaCerrar) {
        this.notaCerrar.hidden = true;
      }

      if (this.btnVolverInicio) {
        this.btnVolverInicio.focus();
      }
    }

    cerrarSalida() {
      if (!this.modal) {
        return;
      }

      this.modal.hidden = true;

      if (this.focoAnterior && typeof this.focoAnterior.focus === 'function') {
        this.focoAnterior.focus();
      }
    }

    _atraparFoco(evento) {
      this._atraparFocoEn(this.modal, evento);
    }

    _atraparFocoEn(contenedor, evento) {
      if (evento.key !== 'Tab' || !contenedor || contenedor.hidden) {
        return;
      }

      const enfocables = Array.from(contenedor.querySelectorAll('button:not(:disabled)')).filter(
        (elemento) => elemento.getClientRects().length > 0
      );

      if (enfocables.length === 0) {
        return;
      }

      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    }
  }

  Vista.Principal = Principal;
})(window);
