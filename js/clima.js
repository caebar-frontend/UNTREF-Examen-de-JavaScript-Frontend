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

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudad) {
    const row = weatherTable.insertRow()
    row.insertCell(0).textContent = ciudad.nombre
    row.insertCell(1).textContent = ciudad.temperatura
    row.insertCell(2).textContent = ciudad.condicion
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    // Evitar duplicados en el historial
    let historial = JSON.parse(localStorage.getItem('historial')) || []
   
    
    // Actualizar la lista en el DOM
    if (!historial.includes(ciudad)) {
        historial.push(ciudad);
        localStorage.setItem('historial', JSON.stringify(historial))
        actualizarHistorialEnDOM()
    }
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    // Limpiar el historial actual
    historyList.innerHTML = ''

    // Obtener el array de historial desde el LocalStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || []

    // Recorrer el historial y cargar en el dom
    historial.forEach(ciudad => {
        const li = document.createElement('li')
        li.textContent = ciudad;
        historyList.appendChild(li)
    })
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    // Vaciar historial en localStorage
    localStorage.removeItem('historial')
    // Vaciar la lista de historial en el DOM
    actualizarHistorialEnDOM()
}

// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // obtener parámetros GET de la URL (ciudad seleccionada)
    const ciudadSeleccionada = obtenerParametroGET('city')
    // obtener información de clima de una ciudad desde localStorage
    if (ciudadSeleccionada) {
        obtenerInfoClima(ciudadSeleccionada)
    }
    // actualizar el historial en el DOM desde localStorage
    actualizarHistorialEnDOM()

})