//referencias del personaje y la imagen
var personaje1 = document.getElementById('personaje1');
const imagen = document.getElementById("imagen");

//variables de imagenes a utilizar
const imgMovDER = "IMG/moverseDER.png";
const imageOriginal = "IMG/personajeEstatico.png";
const imgMovIZQ = "IMG/moverseIZQ.png";

let teclaSPresionada = false;

//agrega eventos de teclado
document.addEventListener('keydown', function(event) { 
    var tecla = event.keyCode;
    if (event.key === "a" || event.key === "A") {
      moverPersonaje(personaje1, -30, imgMovIZQ);
    }
    if (event.key === "d" || event.key === "D") {
      moverPersonaje(personaje1, 10,imgMovDER);
    }
});

// Manejar el evento de soltar la tecla
document.addEventListener('keyup', (event) => {
    // Verificar si la tecla que se soltó es la que utilizaste para el cambio
    if (event.key === 'a' || event.key === 'A' || event.key === 'd' || event.key === 'D') {
      imagen.src = imageOriginal;  // Volver a la imagen original al soltar la tecla
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