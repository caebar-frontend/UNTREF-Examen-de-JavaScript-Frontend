// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)

const weatherTable = document.getElementById('weatherTable').getElementsByTagName('tbody')[0]
const historyList = document.getElementById('historyList')
const clearHistoryBtn = document.getElementById('clearHistoryBtn')
