// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)

const weatherTable = document.getElementById('weatherTable').getElementsByTagName('tbody')[0]
const historyList = document.getElementById('historyList')
const clearHistoryBtn = document.getElementById('clearHistoryBtn')

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombreParametro);
}
