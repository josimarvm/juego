# Aprende Jugando — versión web

Proyecto web educativo basado en la aplicación de escritorio **appJuegoEducativo** (Java Swing). Conserva la misma idea, los mismos juegos y la misma organización en capas, pero ahora está hecho únicamente con **HTML, CSS y JavaScript**, sin dependencias ni proceso de compilación.

## Cómo ejecutarlo

1. Abre `index.html` con un navegador moderno (Chrome, Edge, Firefox o Safari).
2. También puedes servirlo con un servidor local si lo prefieres:

   ```bash
   # Con Python
   python -m http.server 8080

   # Con Node.js
   npx serve .
   ```

   Después visita `http://localhost:8080` (o el puerto que indique la herramienta).

El proyecto funciona directamente desde el sistema de archivos porque usa scripts clásicos, no módulos ES.

## Arquitectura en capas

La estructura replica las capas del proyecto original:

```
web/
├── index.html                 # Estructura de la ventana y de los paneles
├── css/
│   ├── base.css               # Variables, reinicio, contenedor y menú
│   ├── componentes.css        # Paneles, opciones, letras, animales y diálogo
│   └── responsive.css         # Adaptación a tablet, móvil y poca altura
├── js/
│   ├── Controlador/           # Capa de lógica (no toca el DOM)
│   │   ├── Aleatorio.js
│   │   ├── Mensajes.js
│   │   ├── Letras.js
│   │   ├── Numero.js
│   │   ├── Suma.js
│   │   ├── Resta.js
│   │   └── Multiplicacion.js
│   ├── Vista/                 # Capa de presentación y eventos
│   │   ├── Rutas.js
│   │   ├── PanelNumero.js
│   │   ├── PanelLetras.js
│   │   ├── PanelJuegoBase.js
│   │   ├── PanelInicio.js
│   │   ├── PanelAdivinaNumero.js
│   │   ├── PanelSuma.js
│   │   ├── PanelResta.js
│   │   ├── PanelMultiplicacion.js
│   │   ├── PanelVocal.js
│   │   ├── PanelConsonante.js
│   │   └── Principal.js
│   └── main.js                # Punto de entrada
└── Recursos/
    └── imagenes/              # Imágenes copiadas del proyecto original
        ├── animales/
        ├── fondo/
        └── letras/
```

### Capa Controlador

Contiene las reglas del juego y genera los datos aleatorios. No conoce ni modifica el DOM:

- `Numero`: elige una cantidad, una figura y cuatro opciones.
- `Suma`, `Resta` y `Multiplicacion`: generan la operación, su resultado, la figura y las opciones. La resta nunca produce resultados negativos.
- `Letras`: crea una cuadrícula de 4 × 4 y decide cuántas vocales o consonantes debe contar el jugador.
- `Mensajes`: administra los mensajes de acierto y el ciclo de mensajes de fallo.
- `Aleatorio`: utilidades compartidas (`entero`, `entre`, `elegir`, `opciones`).

### Capa Vista

Dibuja la interfaz, escucha los clics y se comunica con los controladores:

- `PanelNumero`: pinta la cantidad de animales indicada.
- `PanelLetras`: pinta la cuadrícula de letras.
- `PanelJuegoBase`: concentra el comportamiento común de los juegos (opciones, validación, marcador, mensajes y pausa de 1,2 s antes de la siguiente ronda).
- `PanelInicio`, `PanelAdivinaNumero`, `PanelSuma`, `PanelResta`, `PanelMultiplicacion`, `PanelVocal`, `PanelConsonante`: una vista por cada juego.
- `Principal`: controla el menú, el cambio de panel y el diálogo de salida.

### Capa Recursos

Las imágenes (`animales`, `letras`, fondos, botones y operadores) se copiaron desde `src/Recursos/imagenes` del proyecto Java, por lo que el aspecto visual se mantiene.

## Correspondencia con el proyecto Java

| Java Swing | Versión web |
| --- | --- |
| `Controlador/Numero.java` | `js/Controlador/Numero.js` |
| `Controlador/Suma.java` | `js/Controlador/Suma.js` |
| `Controlador/Resta.java` | `js/Controlador/Resta.js` |
| `Controlador/Multiplicacion.java` | `js/Controlador/Multiplicacion.js` |
| `Controlador/Letras.java` | `js/Controlador/Letras.js` |
| `Controlador/Mensajes.java` | `js/Controlador/Mensajes.js` |
| `Vista/PanelInicio.java` | `js/Vista/PanelInicio.js` |
| `Vista/PanelAdivinaNumero.java` | `js/Vista/PanelAdivinaNumero.js` |
| `Vista/PanelSuma.java` | `js/Vista/PanelSuma.js` |
| `Vista/PanelResta.java` | `js/Vista/PanelResta.js` |
| `Vista/PanelMultiplicacion.java` | `js/Vista/PanelMultiplicacion.js` |
| `Vista/PanelVocal.java` | `js/Vista/PanelVocal.js` |
| `Vista/PanelConsonante.java` | `js/Vista/PanelConsonante.js` |
| `Vista/PanelNumero.java` | `js/Vista/PanelNumero.js` |
| `Vista/PanelLetras.java` | `js/Vista/PanelLetras.js` |
| `Vista/Principal.java` | `js/Vista/Principal.js` |
| `Recursos/imagenes/` | `Recursos/imagenes/` |
| `javax.swing.Timer` (1,2 s) | `setTimeout` en `PanelJuegoBase` |

## Funcionalidad

- **Inicio**: pantalla de bienvenida con la imagen de fondo original.
- **Adivina el número**: cuenta los animales de la tarjeta y elige una de las cuatro opciones.
- **Sumas, restas y multiplicaciones**: se muestran dos grupos de animales y la operación; hay cuatro respuestas posibles.
- **Vocales y consonantes**: se presenta una cuadrícula de 16 letras y se pregunta cuántas hay de cada tipo.
- Cada acierto suma un punto, muestra un mensaje de ánimo y, tras 1,2 segundos, genera una nueva ronda.
- Cada fallo muestra un mensaje distinto y permite intentarlo otra vez.
- El marcador se conserva mientras se cambia de juego.
- **Salir** abre un diálogo para volver al inicio o intentar cerrar la pestaña.

## Diseño adaptable (responsive)

- **Escritorio (más de 820 px):** ventana centrada con el menú lateral fijo, igual que la aplicación Swing.
- **Tablet y móvil (820 px o menos):** barra superior con el botón **Juegos** y menú lateral deslizante. Al elegir un juego el menú se cierra automáticamente y el foco pasa al panel.
- **Móvil horizontal y ventanas bajas (560 px de alto o menos):** se activa el mismo diseño compacto y los paneles reducen títulos, dibujos y botones para que todo quepa sin desplazamiento.
- Los botones de respuesta son cuadrados y grandes al tacto; en pantallas estrechas se mantienen las cuatro columnas.
- Se respetan las áreas seguras del dispositivo (`env(safe-area-inset-*)`) y la altura dinámica del navegador (`100dvh`).
- En dispositivos táctiles se anulan los efectos `hover` para que no queden pegados tras un toque.
- El menú deslizante atrapa el foco, se cierra con `Escape`, con el botón ✕ o tocando el fondo oscuro.
- Se respeta `prefers-reduced-motion` para desactivar animaciones.

## Mejoras respecto a la versión de escritorio

- Diseño adaptable con menú lateral deslizante en móvil y tablet, y paneles que se ajustan a cualquier alto de pantalla.
- Las opciones incorrectas son siempre distintas entre sí y distintas de la respuesta correcta.
- Los botones deshabilitados y los estados de acierto/fallo son visibles y accesibles.
- Se añadieron etiquetas ARIA, foco visible, navegación por teclado y cierre del diálogo con `Escape`.
- La pausa entre rondas se cancela correctamente al cambiar de juego.
- Se corrigió la codificación de la letra **Ñ** y se conservan los acentos en los textos.
- Se muestra un mensaje claro si el navegador no permite cerrar la pestaña automáticamente.

## Pruebas realizadas

- 5.000 iteraciones de los controladores verificando rangos, resultados, matrices de letras y opciones únicas.
- Pruebas de navegación, aciertos, fallos, marcador, temporizadores y diálogo de salida en Chromium.
- Revisión de medidas en 320 × 568, 360 × 640, 390 × 844, 414 × 896, 768 × 1024, 932 × 430 y 844 × 390: sin desbordes y sin desplazamiento dentro de los paneles.
- Comprobación del menú deslizante: apertura y cierre, foco atrapado, `Escape`, fondo y botón ✕, y cierre automático al elegir un juego.
- Comprobación en escritorio (900 × 600, 1024 × 768 y 1280 × 800) para asegurar que el diseño de dos columnas no cambia.
