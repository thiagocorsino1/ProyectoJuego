//referencias del personaje y la imagen
var personaje1 = document.getElementById('personaje1');
var personaje2 = document.getElementById('personaje2');
const imagen = document.getElementById("imagen");
const imagen2 = document.getElementById("imagen2");

//variables de imagenes a utilizar
const imgMovDER = "IMG/moverseDER.png";
const imageOriginal = "IMG/personajeEstatico.png";
const imgMovIZQ = "IMG/moverseIZQ.png";
const imgAgachado = "IMG/personajeAgachado.png";
const imgSalto = "IMG/moverseDER.png";
const imgPoder= "IMG/personajePoder.png";
const imgGolpe="IMG/personajePuño.png";
const imgGolpe2="IMG/personajePuño2.png";
const imageOriginal2 = "IMG/personajeEstatico2.png";
const imgSalto2="IMG/moverseIZQ.png";

let teclaSPresionada = false;
let pjAgachado = false;
let tiempoAgachado;
let saltando = false;
let vidaJugador1 = 100;
let vidaJugador2 = 100;
let ultimaEjecucionQ = 0;
let ultimaEjecucionE = 0;


let juegoDetenido = false;

document.addEventListener('keydown', function(event) { 
    var tecla = event.keyCode;
    if (juegoDetenido) {
        return; // Si el juego está detenido, no ejecutar ninguna acción
    }

    if (event.key === "h" || event.key === "H") {//h
      moverPersonaje(personaje1, personaje2, -30, imgMovIZQ, imagen);
    }
    if (event.key === "k" || event.key === "K") {//k
      moverPersonaje(personaje1, personaje2, 10,imgMovDER, imagen);
    }
    if (event.key === "j" || event.key === "J") {//j
        teclaSPresionada = true;
        imagen.src = imgAgachado;
        agachada(imagen);
    }
    if (event.key === "u" || event.key === "U") {//u
        Saltar(imagen, imgSalto);
    }
    if (event.key === "y" || event.key === "Y") {//y
        //obtener el tiempo actual
        const currentTime = Date.now();
        //verificar si ha pasado suficiente tiempo desde la última ejecución
        if (currentTime - ultimaEjecucionQ >= 300) { // Permitir ejecución cada 5000 milisegundos (5 segundos)
        const personajeid='personaje1';
        const PJReceptor='personaje2';
	    const barravida2 = 'vidaJugador2';
        const contadorVida2 = 'contadorVida2';
        crearEsfera(personajeid, 0, "+", PJReceptor, barravida2, contadorVida2, imagen, imgPoder, imageOriginal);
        //actualizar el tiempo de última ejecución
        ultimaEjecucionQ = currentTime;
        }
    }
    if (event.key === 'i' || event.key === 'I') {//i
       //obtener el tiempo actual
       const tiempoActual = Date.now();
       //verificar si ha pasado suficiente tiempo desde la última ejecución
       if (tiempoActual - ultimaEjecucionE >= 500) { 
            //ejecutar la función asociada a la tecla "E"
            ejecutarGolpe(personaje1, 80, imgGolpe, imagen, imageOriginal);
            //actualizar el tiempo de última ejecución
            ultimaEjecucionE = tiempoActual;
       }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'h' || event.key === 'H' || event.key === 'k' || event.key === 'K' || event.key === 'y' || event.key === 'Y') {
      imagen.src = imageOriginal;  // Volver a la imagen original al soltar la tecla
    }
    if (event.key === 'j' || event.key === 'J') {
        teclaSPresionada = false;
        // Cancelar el temporizador de agachamiento
        clearTimeout(tiempoAgachado);
        pjAgachado = false;
        imagen.src = imageOriginal;
        // Restablecer la escala en el eje Y a 1 y la translación vertical a 0
        imagen.style.transform = "scaleY(1) translateY(0)";
    }
});

function moverPersonaje(personaje1, personaje2, valorActual, img, imagen) {
    // Si la tecla S esta presionada, no activa la funcion para moverse hacia los costados
    if(!teclaSPresionada){
        imagen.src = img;
        // Obtener el rectángulo que describe la posición y dimensiones de la caja
        var cajaPosicion = personaje1.getBoundingClientRect();
        var cajaPosicion2 = personaje2.getBoundingClientRect();
        var distanciaEntrePersonajes = cajaPosicion2.left - cajaPosicion.right;
        // Si el personaje1 se mueve a la derecha y está cerca del personaje2, detener el movimiento
        if (valorActual > 0 && distanciaEntrePersonajes < 1) { // Puedes ajustar el valor de la distancia según tu escenario
            return; // Evita que el personaje1 se mueva más hacia la derecha
        }
        // Obtener el rectángulo que describe la posición y dimensiones del contenedor
        var limiteContenedor = document.getElementById('contenedor').getBoundingClientRect(); 
        // Calcular la nueva posición horizontal de la caja sumando el desplazamiento (valorActual) al valor actual
        var nuevaPosicion = cajaPosicion.left + valorActual;
        // Verifica los límites del contenedor
        if (nuevaPosicion >= limiteContenedor.left && nuevaPosicion <= limiteContenedor.right - cajaPosicion.width){
        // Si la nueva posición está dentro de los límites del contenedor, se actualiza la posición de la caja horizontalmente
        personaje1.style.left = nuevaPosicion + 'px';
      }
    }
}
function agachada(imagen){
    pjAgachado = true;
    // Ajusta la altura del personaje agachado según tus necesidades
    const pjAltura = 0.7; // Reduce la altura a la mitad (ajusta según sea necesario)
    const trasladaPj = 70; // Desplaza hacia abajo en píxeles (ajusta según sea necesario)
    // Se utiliza `requestAnimationFrame` para crear un bucle de animación.
    // Define una función que se llamará en cada cuadro de animación
    function agachadoFrame() {
        if (pjAgachado) {
        // Ajusta la escala en el eje Y para reducir la altura del personaje y traslada el personaje hacia abajo
        imagen.style.transform = `scaleY(${pjAltura}) translateY(${trasladaPj}px)`;
        // Llama a requestAnimationFrame para seguir actualizando la animación
        requestAnimationFrame(agachadoFrame);
        }
    }
    // Iniciar el bucle de animación para mantener al personaje agachado
    agachadoFrame();
}

function Saltar(imagen, imgSalto) {
    if (!saltando) {
        saltando = true;
        imagen.src = imgSalto;
        //obtiene la posición vertical inicial de la imagen
        const inicioY = imagen.getBoundingClientRect().top;
        const alturaSalto = 300;//220;//define la altura del salto
        let ubicacionY = inicioY;//variable para ubicar la posición vertical actual
        const duracionSalto = 500;//define la duración del salto
        //establece un intervalo de tiempo que controla la animación de salto
        const intervaloSalto = setInterval(function () {
            //reduce la posición vertical actual para simular el salto
            ubicacionY -= 2;
            //actualiza la transformación CSS para cambiar la posición vertical de la imagen
            imagen.style.transform = `translateY(${ubicacionY - inicioY}px)`;
            //si la posición vertical actual alcanza la altura máxima del salto
            if (ubicacionY <= inicioY - alturaSalto) {
                clearInterval(intervaloSalto);//detiene el intervalo de salto
                imagen.src = imageOriginal;
                imagen.style.transform = "translateY(0)";//restablece la posición vertical de la imagen
                saltando = false;
            }
        }, duracionSalto / (alturaSalto / 2));
    }
}

function disminuirVida(vidaJugador, contadorVida, barravida) {
    if (vidaJugador < 0) vidaJugador = 0;
    //actualiza el ancho visual de la barra de vida
    document.getElementById(barravida).style.width = vidaJugador + '%';
    //actualiza el marcador de vida con el valor actualizado
    document.getElementById(contadorVida).innerText = vidaJugador;

    if (vidaJugador === 0) {
        //redirige a otro HTML cuando la vida del jugador es llega cero
        // muestra el cartel
        document.getElementById('cartel').style.display = 'block';
        juegoDetenido = true;
    }
}

function disminuirVida2(vidaJugador, contadorVida, barravida) {
    if (vidaJugador < 0) vidaJugador = 0;
    //actualiza el ancho visual de la barra de vida
    document.getElementById(barravida).style.width = vidaJugador + '%';
    //actualiza el marcador de vida con el valor actualizado
    document.getElementById(contadorVida).innerText = vidaJugador;

    if (vidaJugador === 0) {
        //redirige a otro HTML cuando la vida del jugador es llega cero
        // muestra el cartel
        document.getElementById('cartel2').style.display = 'block';
        juegoDetenido = true;
    }
}

function crearEsfera(personajeid, n, dir, PJReceptor, barravida, contadorVida, imagen, img) {
    imagen.src = img;
    //obtiene el contenedor de la esfera y el elemento del personaje
    const esferaContainer = document.getElementById('esfera-container');
    const personaje = document.getElementById(personajeid);
    //crea un nuevo elemento div que representa la esfera
    const esfera = document.createElement('div');
    esfera.classList.add('esfera'); //añade la clase esfera al elemento div
    esfera.style.display = 'block'; //asegura que la esfera sea visible
    esferaContainer.appendChild(esfera); //agrega la esfera al contenedor
    //obtiene las dimensiones del personaje
    const personajeDimension = personaje.getBoundingClientRect();
    //posiciona la esfera con respecto al personaje
    esfera.style.top = `${personajeDimension.top + 105}px`;
    esfera.style.left = `${personajeDimension.right-n}px`;
    //llama a la función moverEsfera para iniciar el movimiento de la esfera
    moverEsfera(esfera, dir, PJReceptor, barravida, contadorVida);
}

function moverEsfera(esfera, dir, PJReceptor, barravida, contadorVida) {
    const velocidadEsfera = 15;
    let position = parseFloat(esfera.style.left) || 0;
    //establece un intervalo de tiempo para el movimiento continuo de la esfera
    const moveInterval = setInterval(() => {
        //actualiza la posición de la esfera basada en la dirección
        if (dir === "+") {
            position += velocidadEsfera; //mueve la esfera hacia la derecha
        } else if (dir === "-") {
            position -= velocidadEsfera; //mueve la esfera hacia la izquierda
        }
        esfera.style.left = `${position}px`; //establece la posición horizontal de la esfera
        //obtiene el ancho del contenedor de esferas
        const containerWidth = document.getElementById('esfera-container').offsetWidth;
        //obtiene las posiciones de la esfera y el personaje receptor
        const esferaDimension = esfera.getBoundingClientRect();
        const PJDimension = document.getElementById(PJReceptor).getBoundingClientRect();
        //verifica si la esfera choca con el personaje receptor
        if (
            esferaDimension.right >= PJDimension.left &&
            esferaDimension.left <= PJDimension.right &&
            esferaDimension.bottom >= PJDimension.top &&
            esferaDimension.top <= PJDimension.bottom
        ) {
            // La esfera ha colisionado con el personaje receptor
            vidaJugador2 -= 3; // Reduce la vida del jugador receptor
            disminuirVida(vidaJugador2, contadorVida, barravida); // Actualiza la barra de vida del jugador receptor
            esfera.remove(); // Elimina la esfera
            clearInterval(moveInterval); // Detiene el intervalo de movimiento
        }

        // Verifica si la esfera ha alcanzado el borde derecho del contenedor
        if (position > containerWidth) {
            esfera.remove(); // Elimina la esfera
            clearInterval(moveInterval); // Detiene el intervalo de movimiento
        }
    }, 20); // La función de intervalo se ejecuta cada 20 milisegundos
}

function crearGolpe(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal) {
    imagen.src = imgG;
    const tiempoActual = Date.now();
    const duracion = 200; //Duración en milisegundos(0.2 segundos)
    // Calcular el progreso del movimiento
    const progreso = Math.min(1, (tiempoActual - tiempoInicial) / duracion);
    // Calcular la nueva posición basada en el progreso
    const PosicionNueva = Math.min(progreso * posicion, posicion);
    personaje.style.transform = `translateX(${PosicionNueva}px)`;
    // Continuar moviendo si no se alcanza la duración
    if (progreso < 1) {
        requestAnimationFrame(() => crearGolpe(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal));
    } else {
        // Se alcanzó la duración, volver a la posición original
        personaje.style.transform = 'translateX(0)';
        //isMoving = false;
        imagen.src = imageOriginal;
    }
}

function crearGolpe2(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal) {
    imagen.src = imgG;
    const tiempoActual = Date.now();
    const duracion = 200; //Duración en milisegundos(0.2 segundos)
    // Calcular el progreso del movimiento
    const progreso = Math.min(1, (tiempoActual - tiempoInicial) / duracion);
    // Calcular la nueva posición basada en el progreso
    const PosicionNueva = Math.min(progreso * posicion, posicion);
    personaje.style.transform = `translateX(${PosicionNueva}px)`;
    // Continuar moviendo si no se alcanza la duración
    if (progreso < 1) {
        requestAnimationFrame(() => crearGolpe2(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal));
    } else {
        // Se alcanzó la duración, volver a la posición original
        personaje.style.transform = 'translateX(0)';
        //isMoving = false;
        imagen.src = imageOriginal;
    }
}

function ejecutarGolpe(personaje, posicion, imgG, imagen, imageOriginal) {
    // Comenzar el movimiento hacia la derecha y registrar el tiempo de inicio
    const tiempoInicial = Date.now();
    crearGolpe(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal);
    const barravida2 = 'vidaJugador2';
    const contadorVida2 = 'contadorVida2';
    verificarGolpe(personaje1, personaje2, barravida2, contadorVida2, 5);
}

function ejecutarGolpe2(personaje, posicion, imgG, imagen, imageOriginal) {
    // Comenzar el movimiento hacia la derecha y registrar el tiempo de inicio
    const tiempoInicial = Date.now();
    crearGolpe2(tiempoInicial, personaje, posicion, imgG, imagen, imageOriginal);
    const barravida2 = 'vidaJugador2';
    const contadorVida2 = 'contadorVida2';
    verificarGolpe2(personaje1, personaje2, barravida2, contadorVida2, 8);
}

function verificarGolpe(personajeEmisor, personajeReceptor, barravida, contadorVida, N) {
    const pjEmisor = personajeEmisor.getBoundingClientRect();
    const pjReceptor = personajeReceptor.getBoundingClientRect();
    // Verificar si caja1 está a la izquierda y cerca de caja2
    if (pjEmisor.right >= pjReceptor.left && pjEmisor.left <= pjReceptor.right) {
        vidaJugador2 -=N;
        disminuirVida(vidaJugador2, contadorVida, barravida); // Caja1 golpea a caja2, reducir vida
    }
}

function verificarGolpe2(personajeEmisor, personajeReceptor, barravida, contadorVida, N) {
    const pjEmisor = personajeEmisor.getBoundingClientRect();
    const pjReceptor = personajeReceptor.getBoundingClientRect();
    // Verificar si caja1 está a la izquierda y cerca de caja2
    if (pjEmisor.right >= pjReceptor.left && pjEmisor.left <= pjReceptor.right) {
        vidaJugador2 -=N;
        disminuirVida2(vidaJugador2, contadorVida, barravida); // Caja1 golpea a caja2, reducir vida
    }
}

function moverPersonaje2(valorActual, img, imagen) {
    imagen.src = img;
    // Obtener el rectángulo que describe la posición y dimensiones de la caja del personaje1
    var cajaPosicion1 = personaje1.getBoundingClientRect();
    // Obtener el rectángulo que describe la posición y dimensiones de la caja del personaje2
    var cajaPosicion2 = personaje2.getBoundingClientRect();

    // Si el personaje2 se mueve a la derecha y está cerca del personaje1, detener el movimiento
        
    if (valorActual < 0 && cajaPosicion2.left - cajaPosicion1.right < 1) {
        return; // Evita que el personaje2 se mueva más hacia la izquierda
    }
    // Obtener el rectángulo que describe la posición y dimensiones del contenedor
    var limiteContenedor = document.getElementById('contenedor').getBoundingClientRect();
    // Calcular la nueva posición horizontal de la caja sumando el desplazamiento (valorActual) al valor actual
    var nuevaPosicion = cajaPosicion2.left + valorActual;

    // Verificar los límites del contenedor
    if (nuevaPosicion >= limiteContenedor.left && nuevaPosicion <= limiteContenedor.right - cajaPosicion2.width) {
        // Si la nueva posición está dentro de los límites del contenedor, se actualiza la posición de la caja horizontalmente
        personaje2.style.left = nuevaPosicion + 'px';
    }
}

function crearEsfera2(personajeid, n, dir, PJReceptor, barravida, contadorVida, imagen, img) {
    imagen.src = img;
    //obtiene el contenedor de la esfera y el elemento del personaje
    const esferaContainer = document.getElementById('esfera-container');
    const personaje = document.getElementById(personajeid);
    //crea un nuevo elemento div que representa la esfera
    const esfera = document.createElement('div');
    esfera.classList.add('esfera'); //añade la clase esfera al elemento div
    esfera.style.display = 'block'; //asegura que la esfera sea visible
    esferaContainer.appendChild(esfera); //agrega la esfera al contenedor
    //obtiene las dimensiones del personaje
    const personajeDimension = personaje.getBoundingClientRect();
    //posiciona la esfera con respecto al personaje
    esfera.style.top = `${personajeDimension.top + 105}px`;
    esfera.style.left = `${personajeDimension.right-n}px`;
    //llama a la función moverEsfera para iniciar el movimiento de la esfera
    moverEsfera2(esfera, dir, PJReceptor, barravida, contadorVida);
}

function moverEsfera2(esfera, dir, PJReceptor, barravida, contadorVida) {
    const velocidadEsfera = 15;
    let position = parseFloat(esfera.style.left) || 0;
    //establece un intervalo de tiempo para el movimiento continuo de la esfera
    const moveInterval = setInterval(() => {
        //actualiza la posición de la esfera basada en la dirección
        if (dir === "+") {
            position += velocidadEsfera; //mueve la esfera hacia la derecha
        } else if (dir === "-") {
            position -= velocidadEsfera; //mueve la esfera hacia la izquierda
        }
        esfera.style.left = `${position}px`; //establece la posición horizontal de la esfera
        //obtiene el ancho del contenedor de esferas
        const containerWidth = document.getElementById('esfera-container').offsetWidth;
        //obtiene las posiciones de la esfera y el personaje receptor
        const esferaDimension = esfera.getBoundingClientRect();
        const PJDimension = document.getElementById(PJReceptor).getBoundingClientRect();
        //verifica si la esfera choca con el personaje receptor
        if (
            esferaDimension.right >= PJDimension.left &&
            esferaDimension.left <= PJDimension.right &&
            esferaDimension.bottom >= PJDimension.top &&
            esferaDimension.top <= PJDimension.bottom
        ) {
            // La esfera ha colisionado con el personaje receptor
    
            vidaJugador2 -= 5; // Reduce la vida del jugador receptor
            disminuirVida2(vidaJugador2, contadorVida, barravida); // Actualiza la barra de vida del jugador receptor
            esfera.remove(); // Elimina la esfera
            clearInterval(moveInterval); // Detiene el intervalo de movimiento
        }

        // Verifica si la esfera ha alcanzado el borde derecho del contenedor
        if (position > containerWidth) {
            esfera.remove(); // Elimina la esfera
            clearInterval(moveInterval); // Detiene el intervalo de movimiento
        }
    }, 20);// La función de intervalo se ejecuta cada 20 milisegundos
}

function agachada2(imagen) {
    imagen2.src = imgAgachado;
    const pjAltura = 0.7;
    const trasladaPj = 70;
    const duracion = 500; // Duración en milisegundos (medio segundo)
    const tiempoInicio = Date.now();

    function agachadoFrame() {
        const tiempoActual = Date.now();
        const tiempoTranscurrido = tiempoActual - tiempoInicio;

        if (tiempoTranscurrido < duracion) {
            const progreso = tiempoTranscurrido / duracion;
            // Ajusta la escala en el eje Y y la traslación en función del progreso
            imagen.style.transform = `scaleY(${pjAltura}) translateY(${trasladaPj}px)`;
            // Llama a requestAnimationFrame para seguir actualizando la animación
            requestAnimationFrame(agachadoFrame);
        } else {
            // El tiempo de agacharse ha terminado, vuelve a la posición original
            imagen.style.transform = 'scaleY(1) translateY(0)';
            imagen.src = imageOriginal2;
        }
    }

    // Iniciar el bucle de animación
    agachadoFrame();
}

function moverAleatorio() {
    const movimientos = [-90, 60];
    const movimientoAleatorio = movimientos[Math.floor(Math.random() * movimientos.length)];
    moverPersonaje2(movimientoAleatorio, movimientoAleatorio > 0 ? imgMovDER : imgMovIZQ, imagen2);
}

function saltarAleatorio() {
    Saltar(imagen2, imgSalto2, imageOriginal2);
}

function agacharseAleatorio() {
    agachada2(imagen2);
}

function lanzarEsferaAleatorio() {
    const personajeid = 'personaje2';
    const PJReceptor = 'personaje1';
    const barravida = 'vidaJugador1';
    const contadorVida = 'contadorVida1';
    const direccion = "-"; // Dirección fija: izquierda
    crearEsfera2(personajeid, 170, direccion, PJReceptor, barravida, contadorVida, imagen2, imgPoder);
}

function ejecutarGolpeAleatorio() {
    // Comenzar el movimiento hacia la derecha y registrar el tiempo de inicio
    const tiempoInicial = Date.now();
    crearGolpe2(tiempoInicial, personaje2, -80, imgGolpe2, imagen2, imageOriginal2);
    const barravida1 = 'vidaJugador1';
    const contadorVida1 = 'contadorVida1';
    verificarGolpe2(personaje2, personaje1, barravida1, contadorVida1, 20);//ultimo item para cambiar la vida a restar
}

function accionesAleatoriasPersonaje2() {
    if (juegoDetenido) {
        return; // Si el juego está detenido, no ejecutar ninguna acción
    }
    const accionesPosibles = [
        moverAleatorio,
        saltarAleatorio,
        agacharseAleatorio,
        lanzarEsferaAleatorio,
        ejecutarGolpeAleatorio
    ];
    const accionAleatoria = accionesPosibles[Math.floor(Math.random() * accionesPosibles.length)];
    accionAleatoria();
}

// Ejecutar acciones aleatorias del personaje2 cada cierto tiempo
setInterval(accionesAleatoriasPersonaje2, 900);