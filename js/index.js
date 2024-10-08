// 1. Obtener referencia al formulario y al select de ciudades 
const cityForm = document.getElementById('cityForm')
const selectCity = document.getElementById('selectCity')

// 2. Definir función para cargar dinámicamente las opciones de ciudades desde datos.json usando fetch

function cargarOpcionesCiudades() {
    // Llamar al archivo usando fetch
    fetch('public/datos.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos en localStorage para usarlos en clima.html
            localStorage.setItem('ciudades', JSON.stringify(data.ciudades))
            // Iterar sobre las ciudades obtenidas y agregar opciones al select
            data.ciudades.forEach(ciudad => {
                const option = document.createElement('option')
                option.value = ciudad.nombre
                option.textContent = ciudad.nombre
                selectCity.appendChild(option)
            })
        })
        .catch(error => {
            console.error('Error al cargar las opciones de ciudades desde datos.json:', error)
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            alert('No se pudieron cargar las ciudades. Intenta de nuevo más tarde.')
        })
}

// 3. Manejar evento de envío del formulario para redirigir a clima.html con la ciudad seleccionada
cityForm.addEventListener('submit', function(event) {
    // Prevenir el envío del formulario para manejarlo con JavaScript
    event.preventDefault()
    // Redirigir a clima.html con la ciudad seleccionada como parámetro GET
    const ciudadSeleccionada = selectCity.value;
    window.location.href = `clima.html?city=${encodeURIComponent(ciudadSeleccionada)}`
})