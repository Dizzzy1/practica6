let currentPage = 1;
const totalPages = 5;
let formData = {};

// Funcion para cambiar a la siguiente pagina
function nextPage() {
    if (currentPage < totalPages) {
        if (validatePage(currentPage)) {
            document.getElementById(`page${currentPage}`).classList.remove('active');
            currentPage++;
            document.getElementById(`page${currentPage}`).classList.add('active');
            updateNavigation();
            if (currentPage === totalPages) {
                showSummary();
            }
        } else {
            alert("Por favor, completa todos los campos obligatorios.");
        }
    }
}

// Funcion para regresar a la pagina anterior
function prevPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page${currentPage}`).classList.add('active');
        updateNavigation();
    }
}

// Funcion para validar los campos de la pagina actual
function validatePage(page) {
    switch (page) {
        case 1:
            return document.getElementById('nombre').value.trim() !== '' &&
                   document.getElementById('edad').value.trim() !== '' &&
                   document.getElementById('correo').value.trim() !== '';
        case 2:
            return document.getElementById('famNombre').value.trim() !== '' &&
                   document.getElementById('famParentesco').value.trim() !== '';
        case 3:
            return document.getElementById('ConEnfermedad').value.trim() !== '';
        case 4:
            return document.getElementById('internFecha').value.trim() !== '' &&
                   document.getElementById('internCentro').value.trim() !== '';
        default:
            return true;
    }
}

// Funcion para mostrar el resumen de los datos
function showSummary() {
    formData = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        direccion: document.getElementById('direccion').value,
        famNombre: document.getElementById('famNombre').value,
        famParentesco: document.getElementById('famParentesco').value,
        famEdad: document.getElementById('famEdad').value,
        ConEnfermedad: document.getElementById('ConEnfermedad').value,
        Contiempo: document.getElementById('Contiempo').value,
        internFecha: document.getElementById('internFecha').value,
        internCentro: document.getElementById('internCentro').value,
        internDiagnostico: document.getElementById('internDiagnostico').value
    };

    // Mostrar los datos en el resumen
    document.getElementById('summary').textContent = JSON.stringify(formData, null, 2);

    // Mostrar los botones de Editar y Guardar
    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('saveButton').style.display = 'inline-block';
}

// Funcion para editar los datos
function editData() {
    currentPage = 1;
    document.getElementById(`page${totalPages}`).classList.remove('active');
    document.getElementById(`page${currentPage}`).classList.add('active');
    updateNavigation();
}

// Funcion para guardar los datos en un archivo JSON y convertir los datos a formato Json
function saveData() {

    const jsonData = JSON.stringify(formData, null, 2);

    // Crear un archivo JSON y permitir su descarga
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos-formulario.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Archivo JSON generado y descargado correctamente.");

    // Ocultar el boton de Editar y mostrar el boton "Crear otro"
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('createAnotherButton').style.display = 'inline-block';
}

// Funcion para reiniciar el formulario y crear otro
function createAnother() {
    document.getElementById('multiPageForm').reset();

    // Volver a la primera pagina
    currentPage = 1;
    document.getElementById(`page${totalPages}`).classList.remove('active');
    document.getElementById(`page${currentPage}`).classList.add('active');

    // Ocultar el boton Crear otro y mostrar los botones de Editar y Guardar
    document.getElementById('createAnotherButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('saveButton').style.display = 'inline-block';

    // Limpiar el resumen
    document.getElementById('summary').textContent = '';
}

// Funcion para actualizar la navegacion
function updateNavigation() {
    console.log(`Página actual: ${currentPage}`);
}