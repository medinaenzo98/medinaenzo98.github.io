const agujeros = document.querySelectorAll('.agujero');
const puntuacionSpan = document.getElementById('puntuacion');
const botonInicio = document.getElementById('boton-inicio');

let puntuacion = 0;
let ultimoAgujero;
let tiempoJuegoTerminado = false;

function elegirAgujeroAlAzar(agujeros) {
  const idx = Math.floor(Math.random() * agujeros.length);
  const agujero = agujeros[idx];
  if (agujero === ultimoAgujero) {
    return elegirAgujeroAlAzar(agujeros);
  }
  ultimoAgujero = agujero;
  return agujero;
}

function tiempoAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function mostrarTopo() {
  const tiempo = tiempoAleatorio(500, 1500);
  const agujero = elegirAgujeroAlAzar(agujeros);
  
  agujero.classList.add('visible');
  
  setTimeout(() => {
    agujero.classList.remove('visible');
    if (!tiempoJuegoTerminado) {
      mostrarTopo();
    }
  }, tiempo);
}

function iniciarJuego() {
  puntuacion = 0;
  puntuacionSpan.textContent = puntuacion;
  tiempoJuegoTerminado = false;
  mostrarTopo();
  setTimeout(() => {
    tiempoJuegoTerminado = true;
    setTimeout(() => {
      alert(`¡Juego terminado! Tu puntuación final es: ${puntuacion}`);
    }, 500);
  }, 20000);
}

function golpearTopo(e) {
  if (!e.target.parentElement.classList.contains('visible') || tiempoJuegoTerminado) return;
  puntuacion++;
  puntuacionSpan.textContent = puntuacion;
  e.target.parentElement.classList.remove('visible');
}

agujeros.forEach(agujero => agujero.addEventListener('click', golpearTopo));
botonInicio.addEventListener('click', iniciarJuego);