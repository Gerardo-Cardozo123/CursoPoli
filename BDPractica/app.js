// Base de datos en memoria
let proyectos = [
    {
        id: 1,
        nombre: "Proyecto Clínica Odontológica",
        descripcion: "Desarrollo de un sistemas de gestión para la clínica",
        tareas: [
            {
                id: 1,
                nombre: "Diseñar la base de datos",
                descripcion: "Definir las tablas, campos y relaciones para almacenar",
                estado_completado: false,
                fecha_limite: "2024-12-01"
            },
            {
                id: 2,
                nombre: "Implementar backend",
                descripcion: "Crear las APIs necesarias para gestionar las operaciones",
                estado_completado: false,
                fecha_limite: "2024-12-15"
            },
            {
                id: 3,
                nombre: "Diseño de UI/UX",
                descripcion: "Desarrollar una interfaz amigable para la gestión",
                estado_completado: true,
                fecha_limite: "2024-11-20"
            }
        ]
    }
];

// Referencias a elementos del DOM
const formTarea = document.getElementById('form-tarea');
const tablaTareas = document.getElementById('tabla-tareas').querySelector('tbody');

// Función para renderizar tareas
function renderizarTareas() {
    tablaTareas.innerHTML = ""; // Limpiar tabla
    const tareas = proyectos[0].tareas; // Asumimos un proyecto
    tareas.forEach((tarea) => {
        const fila = document.createElement('tr');
        fila.className = tarea.estado_completado ? 'completed' : '';
        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.fecha_limite}</td>
            <td>${tarea.estado_completado ? "Completado" : "Pendiente"}</td>
            <td>
                <button onclick="cambiarEstado(${tarea.id})">Cambiar Estado</button>
                <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </td>
        `;
        tablaTareas.appendChild(fila);
    });
}

// Agregar nueva tarea
formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-tarea').value;
    const descripcion = document.getElementById('descripcion-tarea').value;
    const fechaLimite = document.getElementById('fecha-limite').value;

    const nuevaTarea = {
        id: proyectos[0].tareas.length + 1,
        nombre,
        descripcion,
        estado_completado: false,
        fecha_limite: fechaLimite
    };

    proyectos[0].tareas.push(nuevaTarea);
    renderizarTareas();
    formTarea.reset();
});

// Cambiar estado de tarea
function cambiarEstado(id) {
    const tarea = proyectos[0].tareas.find(t => t.id === id);
    if (tarea) {
        tarea.estado_completado = !tarea.estado_completado;
        renderizarTareas();
    }
}

// Eliminar tarea
function eliminarTarea(id) {
    proyectos[0].tareas = proyectos[0].tareas.filter(t => t.id !== id);
    renderizarTareas();
}

// Inicializar renderizado
renderizarTareas();
