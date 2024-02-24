const MARGEN_TABLERO = 10
        let regulador_velocidad_teclas = 0
        let regulador_de_caida = 0
        let lineas_hechas = 0

        /* Fondo dinámico */
        let angulo_fondo = Math.random() * 360
        let tono_fondo = Math.random() * 360
        setInterval(() => {
            document.body.style.background = `linear-gradient(
                ${angulo_fondo}deg, 
                hsl(${tono_fondo},100%,50%),
                hsl(${tono_fondo},100%,0%)
            )`
            angulo_fondo += Math.random()
            tono_fondo += Math.random()
        }, 20);

        setInterval(() => {
            if (millis() - regulador_de_caida < 300) {
                return
            }
            regulador_de_caida = millis()
            tetrimino.moverAbajo()
        }, 500);

        function setup() {
            createCanvas(900, 600)

            tablero = new Tablero()
            crearMapeoBaseTetriminos()
            tetrimino = new Tetrimino()
            resizeCanvas(
                tablero.ancho + 2 * MARGEN_TABLERO,
                tablero.alto + 2 * MARGEN_TABLERO + 2*tablero.lado_celda
            )
        }

        function draw() {
            clear()
            dibujarPuntaje()
            tablero.dibujar()
            tetrimino.dibujar()
            keyEventsTetris()
        }

        function dibujarPuntaje() {
            push()
            textSize(20)
            strokeWeight(2)
            stroke("black")
            fill("white")
            text(
                "Líneas: " + lineas_hechas,
                tablero.posición.x,
                tablero.posición.y - tablero.lado_celda / 2
            )
            pop()
        }

        let límite_regulador_velocidad_teclas = 100

        function keyEventsTetris() {
            if (millis() - regulador_velocidad_teclas < límite_regulador_velocidad_teclas) {
                return
            }
            límite_regulador_velocidad_teclas = 100
            regulador_velocidad_teclas = millis()

            if (keyIsDown(RIGHT_ARROW)) {
                tetrimino.moverDerecha()
                regulador_de_caida = millis()
            }
            if (keyIsDown(LEFT_ARROW)) {
                tetrimino.moverIzquierda()
                regulador_de_caida = millis()
            }
            if (keyIsDown(DOWN_ARROW)) {
                tetrimino.moverAbajo()
                regulador_de_caida = millis()
            }
            if (keyIsDown(UP_ARROW)) {
                límite_regulador_velocidad_teclas = 150
                tetrimino.girar()
                regulador_de_caida = millis()
            }
            if (keyIsDown(32)) {
                límite_regulador_velocidad_teclas = 200
                tetrimino.ponerEnElFondo()
                regulador_de_caida = millis()
            }
        }