// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)

const weatherTable = document.getElementById('weatherTable').getElementsByTagName('tbody')[0]
const historyList = document.getElementById('historyList')
const clearHistoryBtn = document.getElementById('clearHistoryBtn')

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombreParametro);
}

// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
    // Obtener los datos del clima almacenados en localStorage
    const ciudades = JSON.parse(localStorage.getItem('ciudades'))
   
    // Buscar la ciudad en los datos obtenidos
    const ciudadEncontrada = ciudades.find(c => c.nombre === ciudad)

    if (ciudadEncontrada) {
        // Mostrar la información del clima en la tabla
        mostrarClimaEnTabla(ciudadEncontrada)
        
        // Agregar la ciudad al historial en localStorage
        agregarCiudadAHistorial(ciudadEncontrada.nombre)
    } else {
        console.error(`No se encontró información para la ciudad ${ciudad}`)
        // Manejar el caso donde no se encuentra la ciudad en los datos
        alert(`No se encontró información para ${ciudad}.`)
    }
}
