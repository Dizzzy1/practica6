let currentPage = 1;
const totalPages = 5;

// Navegación entre páginas
function nextPage() {
    if (currentPage < totalPages) {
        if (validatePage(currentPage)) {
            // Mostrar el nombre del paciente al avanzar desde la página 1
            if (currentPage === 1) {
                const nombrePaciente = document.getElementById('nombre').value;
                mostrarNombrePaciente(nombrePaciente);
            }
            
            document.getElementById(`page${currentPage}`).classList.remove('active');
            currentPage++;
            document.getElementById(`page${currentPage}`).classList.add('active');
            
            // Mostrar vista previa al llegar a la página 5 (Resumen)
            if (currentPage === totalPages) {
                showPreview();
            }
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page${currentPage}`).classList.add('active');
        
        // Ocultar nombre si volvemos a la página 1
        if (currentPage === 1) {
            ocultarNombrePaciente();
        }
    }
}

// Mostrar nombre del paciente
function mostrarNombrePaciente(nombre) {
    const nombrePaciente = document.getElementById('nombrePaciente');
    if (!nombrePaciente) {
        // Crear el elemento si no existe
        const div = document.createElement('div');
        div.id = 'nombrePaciente';
        div.className = 'nombre-paciente';
        div.textContent = `Paciente: ${nombre}`;
        document.body.prepend(div);
    } else {
        nombrePaciente.textContent = `Paciente: ${nombre}`;
        nombrePaciente.style.display = 'block';
    }
}

// Ocultar nombre del paciente
function ocultarNombrePaciente() {
    const nombrePaciente = document.getElementById('nombrePaciente');
    if (nombrePaciente) {
        nombrePaciente.style.display = 'none';
    }
}

// Validación básica de campos obligatorios
function validatePage(page) {
    switch(page) {
        case 1:
            return document.getElementById('nombre').value.trim() !== '' && 
                   document.getElementById('edad').value.trim() !== '' &&
                   document.getElementById('correo').value.trim() !== '';
        default:
            return true;
    }
}

// Mostrar vista previa de todos los datos
function showPreview() {
    const previewData = {
        // Datos Personales
        "Nombre": document.getElementById('nombre').value,
        "Edad": document.getElementById('edad').value,
        "Teléfono": document.getElementById('telefono').value,
        "Correo": document.getElementById('correo').value,
        "Dirección": document.getElementById('direccion').value,
        
        // Datos Familiares
        "Nombre Familiar": document.getElementById('famNombre').value,
        "Parentesco": document.getElementById('famParentesco').value,
        "Edad Familiar": document.getElementById('famEdad').value,
        
        // Condiciones de Salud
        "Enfermedad": document.getElementById('ConEnfermedad').value,
        "Tiempo (años)": document.getElementById('Contiempo').value,
        
        // Internamientos
        "Fecha Internamiento": formatDate(document.getElementById('internFecha').value),
        "Centro Médico": document.getElementById('internCentro').value,
        "Diagnóstico": document.getElementById('internDiagnostico').value
    };

    const previewContainer = document.getElementById('previewData');
    previewContainer.innerHTML = '';
    
    // Agrupar por secciones
    const sections = {
        "Datos Personales": ["Nombre", "Edad", "Teléfono", "Correo", "Dirección"],
        "Datos Familiares": ["Nombre Familiar", "Parentesco", "Edad Familiar"],
        "Condiciones de Salud": ["Enfermedad", "Tiempo (años)"],
        "Internamientos": ["Fecha Internamiento", "Centro Médico", "Diagnóstico"]
    };
    
    // Generar HTML para la vista previa
    for (const [sectionTitle, fields] of Object.entries(sections)) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'preview-section';
        sectionDiv.innerHTML = `<h3>${sectionTitle}</h3>`;
        
        fields.forEach(field => {
            const value = previewData[field] || 'No especificado';
            sectionDiv.innerHTML += `
                <div class="preview-row">
                    <span class="preview-label">${field}:</span>
                    <span class="preview-value">${value}</span>
                </div>
            `;
        });
        
        previewContainer.appendChild(sectionDiv);
    }
}

// Función para formatear fecha (opcional)
function formatDate(dateString) {
    if (!dateString) return 'No especificado';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función para guardar datos y reiniciar
function saveData() {
    const formData = {
        // Recopilar todos los datos
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
    
    // Aquí iría tu lógica para guardar (API, localStorage, etc.)
    console.log('Datos a guardar:', formData);
    alert('Datos guardados correctamente');
    
    // Reiniciar formulario
    reiniciarFormulario();
}

// Función para reiniciar el formulario
function reiniciarFormulario() {
    document.getElementById('multiPageForm').reset();
    currentPage = 1;
    document.querySelectorAll('.form-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page1').classList.add('active');
    ocultarNombrePaciente();
    document.getElementById('previewData').innerHTML = '';
}