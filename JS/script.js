//referencias del personaje y la imagen
var personaje1 = document.getElementById('personaje1');
const imagen = document.getElementById("imagen");

//variables de imagenes a utilizar
const imgMovDER = "IMG/moverseDER.png";
const imageOriginal = "IMG/personajeEstatico.png";
const imgMovIZQ = "IMG/moverseIZQ.png";
const imgAgachado = "IMG/personajeAgachado.png";
const imgSalto = "IMG/moverseDER.png";

let teclaSPresionada = false;
let pjAgachado = false;
let tiempoAgachado;
let saltando = false;

document.addEventListener('keydown', function(event) { 
    var tecla = event.keyCode;
    if (event.key === "a" || event.key === "A") {
      moverPersonaje(personaje1, -30, imgMovIZQ);
    }
    if (event.key === "d" || event.key === "D") {
      moverPersonaje(personaje1, 10,imgMovDER);
    }
    if (event.key === "s" || event.key === "S") {
        teclaSPresionada = true;
        imagen.src = imgAgachado;
        agachada();
    }
    if (event.key === "w" || event.key === "W") {
        Saltar();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'd' || event.key === 'D') {
      imagen.src = imageOriginal;  // Volver a la imagen original al soltar la tecla
    }
    if (event.key === 's' || event.key === 'S') {
        teclaSPresionada = false;
        // Cancelar el temporizador de agachamiento
        clearTimeout(tiempoAgachado);
        pjAgachado = false;
        imagen.src = imageOriginal;
        // Restablecer la escala en el eje Y a 1 y la translación vertical a 0
        imagen.style.transform = "scaleY(1) translateY(0)";
    }
});

function moverPersonaje(personaje, valorActual, img) {
    // Si la tecla S esta presionada, no activa la funcion para moverse hacia los costados
    if(!teclaSPresionada){
        imagen.src = img;
        // Obtener el rectángulo que describe la posición y dimensiones de la caja
        var cajaPosicion = personaje.getBoundingClientRect();
        // Obtener el rectángulo que describe la posición y dimensiones del contenedor
        var limiteContenedor = document.getElementById('contenedor').getBoundingClientRect();
        // Calcular la nueva posición horizontal de la caja sumando el desplazamiento (valorActual) al valor actual
        var nuevaPosicion = cajaPosicion.left + valorActual;
        // Verifica los límites del contenedor
        if (nuevaPosicion >= limiteContenedor.left && nuevaPosicion <= limiteContenedor.right - cajaPosicion.width){
        // Si la nueva posición está dentro de los límites del contenedor, se actualiza la posición de la caja horizontalmente
        personaje.style.left = nuevaPosicion + 'px';
      }
    }
}

function agachada(){
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

function Saltar() {
    if (!saltando) {
        saltando = true;
        imagen.src = imgSalto;
        //obtiene la posición vertical inicial de la imagen
        const inicioY = imagen.getBoundingClientRect().top;
        const alturaSalto = 220;//define la altura del salto
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