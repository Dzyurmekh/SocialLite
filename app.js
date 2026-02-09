// ============================================================
// DATOS INICIALES - CONTENT MANAGEMENT SYSTEM (CMS)
// ============================================================

let siteData = {
    noticias: [
        {
            id: 1,
            titulo: "Nuevos avances en tecnología IA",
            contenido: "Los últimos avances en inteligencia artificial están revolucionando diversos sectores...",
            imagen: "https://via.placeholder.com/400x200?text=Noticia+IA",
            fecha: "2026-02-08"
        },
        {
            id: 2,
            titulo: "Descubren nueva especie marina",
            contenido: "Científicos descubren una nueva especie de pez abismal en las profundidades del océano...",
            imagen: "https://via.placeholder.com/400x200?text=Noticia+Marina",
            fecha: "2026-02-07"
        },
        {
            id: 3,
            titulo: "Récord de energía solar en el país",
            contenido: "Se alcanza un nuevo récord en la generación de energía solar limpia...",
            imagen: "https://via.placeholder.com/400x200?text=Noticia+Solar",
            fecha: "2026-02-06"
        }
    ],
    recetas: [
        {
            id: 1,
            nombre: "Pancakes Esponjosos",
            categoria: "desayunos",
            ingredientes: ["2 tazas harina", "2 huevos", "1 taza leche", "2 cdas azúcar", "1 cda levadura"],
            instrucciones: "Mezclar ingredientes secos. Agregar huevos y leche. Cocinar en sartén caliente.",
            imagen: "https://via.placeholder.com/400x200?text=Pancakes",
            tiempo: 20
        },
        {
            id: 2,
            nombre: "Pasta Carbonara",
            categoria: "platos-principales",
            ingredientes: ["400g pasta", "200g jamón serrano", "3 huevos", "Queso parmesano", "Pimienta"],
            instrucciones: "Cocinar pasta. Freír jamón. Mezclar con huevos y queso.",
            imagen: "https://via.placeholder.com/400x200?text=Carbonara",
            tiempo: 25
        },
        {
            id: 3,
            nombre: "Brownies Chocolate",
            categoria: "postres",
            ingredientes: ["200g chocolate", "200g mantequilla", "3 huevos", "200g harina", "100g nueces"],
            instrucciones: "Derretir chocolate y mantequilla. Mezclar con huevos y harina. Hornear 30 mins.",
            imagen: "https://via.placeholder.com/400x200?text=Brownies",
            tiempo: 40
        },
        {
            id: 4,
            nombre: "Limonada Natural",
            categoria: "bebidas",
            ingredientes: ["5 limones", "2 litros agua", "5 cdas azúcar", "Hielo"],
            instrucciones: "Exprimir limones, mezclar con agua y azúcar. Servir con hielo.",
            imagen: "https://via.placeholder.com/400x200?text=Limonada",
            tiempo: 10
        }
    ],
    entretenimiento: [
        {
            id: 1,
            tipo: "humor",
            titulo: "El mejor chiste del día",
            contenido: "¿Por qué los programadores prefieren el dark mode? Porque la luz atrae bugs! 😂",
            imagen: "https://via.placeholder.com/400x200?text=Humor"
        },
        {
            id: 2,
            tipo: "curiosidades",
            titulo: "¿Sabías que...?",
            contenido: "Un cocodrilo no puede sacar la lengua. Sus mandíbulas están diseñadas para mantenerla en su lugar.",
            imagen: "https://via.placeholder.com/400x200?text=Curiosidad"
        },
        {
            id: 3,
            tipo: "videos",
            titulo: "Los gatos más divertidos",
            contenido: "Compilación de videos cortos de gatos haciendo cosas increíbles.",
            imagen: "https://via.placeholder.com/400x200?text=Gatos"
        }
    ]
};

// LocalStorage para persistencia de datos
function guardarDatos() {
    localStorage.setItem('siteData', JSON.stringify(siteData));
}

function cargarDatos() {
    const datos = localStorage.getItem('siteData');
    if (datos) {
        siteData = JSON.parse(datos);
    }
}

// ============================================================
// NAVEGACIÓN Y SECCIONES
// ============================================================

function changeSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionName).classList.add('active');
    
    // Actualizar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Scroll al inicio
    window.scrollTo(0, 0);
    
    // Cargar contenido dinámico
    if (sectionName === 'noticias') {
        renderNoticias();
    } else if (sectionName === 'recetas') {
        renderRecetas();
    } else if (sectionName === 'entretenimiento') {
        renderEntretenimiento();
    } else if (sectionName === 'admin') {
        renderAdmin();
    }
}

// ============================================================
// NOTICIAS
// ============================================================

function renderNoticias() {
    const container = document.getElementById('noticiasContainer');
    container.innerHTML = siteData.noticias.map(noticia => `
        <div class="news-card">
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <div class="news-card-content">
                <div class="news-card-date">
                    <i class="fas fa-calendar"></i> ${new Date(noticia.fecha).toLocaleDateString('es-ES')}
                </div>
                <h3>${noticia.titulo}</h3>
                <p>${noticia.contenido}</p>
                <button class="btn btn-primary" onclick="alert('Artículo completo: ' + '${noticia.titulo}')">Leer más</button>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchNoticias')?.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        document.querySelectorAll('.news-card').forEach(card => {
            const titulo = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = titulo.includes(termino) ? 'block' : 'none';
        });
    });
});

// ============================================================
// RECETAS
// ============================================================

function renderRecetas(categoriaFiltro = 'todas') {
    const container = document.getElementById('recetasContainer');
    const recetasFiltradas = categoriaFiltro === 'todas' 
        ? siteData.recetas 
        : siteData.recetas.filter(r => r.categoria === categoriaFiltro);
    
    container.innerHTML = recetasFiltradas.map(receta => `
        <div class="recipe-card" onclick="mostrarReceta(${receta.id})">
            <img src="${receta.imagen}" alt="${receta.nombre}">
            <div class="recipe-card-content">
                <span class="recipe-card-category">${receta.categoria.replace('-', ' ')}</span>
                <h3>${receta.nombre}</h3>
                <div class="recipe-card-meta">
                    <span><i class="fas fa-clock"></i> ${receta.tiempo} min</span>
                    <span><i class="fas fa-list"></i> ${receta.ingredientes.length} ingredientes</span>
                </div>
                <button class="btn btn-secondary" onclick="event.stopPropagation()">Ver Receta</button>
            </div>
        </div>
    `).join('');
}

function mostrarReceta(id) {
    const receta = siteData.recetas.find(r => r.id === id);
    if (receta) {
        alert(`
RECETA: ${receta.nombre}

INGREDIENTES:
${receta.ingredientes.join('\n')}

INSTRUCCIONES:
${receta.instrucciones}

TIEMPO: ${receta.tiempo} minutos
        `);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderRecetas(e.target.dataset.category);
        });
    });

    document.getElementById('searchRecetas')?.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        document.querySelectorAll('.recipe-card').forEach(card => {
            const nombre = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = nombre.includes(termino) ? 'block' : 'none';
        });
    });
});

// ============================================================
// ENTRETENIMIENTO
// ============================================================

function renderEntretenimiento() {
    const humor = siteData.entretenimiento.filter(e => e.tipo === 'humor');
    const curiosidades = siteData.entretenimiento.filter(e => e.tipo === 'curiosidades');
    const videos = siteData.entretenimiento.filter(e => e.tipo === 'videos');

    document.getElementById('humorContent').innerHTML = `
        <div class="entertainment-grid">
            ${humor.map(item => `
                <div class="entertainment-card">
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="entertainment-card-content">
                        <h3>${item.titulo}</h3>
                        <p>${item.contenido}</p>
                        <button class="btn btn-primary">Compartir <i class="fas fa-share"></i></button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('curiosidadesContent').innerHTML = `
        <div class="entertainment-grid">
            ${curiosidades.map(item => `
                <div class="entertainment-card">
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="entertainment-card-content">
                        <h3>${item.titulo}</h3>
                        <p>${item.contenido}</p>
                        <button class="btn btn-primary">Guardar <i class="fas fa-bookmark"></i></button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('videosContent').innerHTML = `
        <div class="entertainment-grid">
            ${videos.map(item => `
                <div class="entertainment-card">
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="entertainment-card-content">
                        <h3>${item.titulo}</h3>
                        <p>${item.contenido}</p>
                        <button class="btn btn-primary">Ver Video <i class="fas fa-play"></i></button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Activar tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            const tabId = e.target.dataset.tab;
            document.getElementById(tabId + 'Content').classList.add('active');
        });
    });
}

// ============================================================
// JUEGOS
// ============================================================

function iniciarSudoku() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    gameContainer.innerHTML = `
        <h3>Sudoku</h3>
        <div class="sudoku-grid">
            ${Array(81).fill(0).map((_, i) => `
                <input type="text" class="sudoku-cell" maxlength="1" inputmode="numeric" data-index="${i}">
            `).join('')}
        </div>
        <button class="btn btn-primary" onclick="validarSudoku()">Validar</button>
        <button class="btn btn-secondary" onclick="limpiarSudoku()">Limpiar</button>
    `;
}

function iniciarCrucigrama() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    gameContainer.innerHTML = `
        <h3>Crucigrama</h3>
        <div style="background: white; padding: 2rem; border-radius: 10px;">
            <p><strong>Pistas Horizontales:</strong></p>
            <ol>
                <li>Fruta tropical de color amarillo</li>
                <li>Animal que ladra</li>
                <li>Color del cielo despejado</li>
            </ol>
            <p style="margin-top: 2rem;"><strong>Pistas Verticales:</strong></p>
            <ol>
                <li>Bebida caliente que se toma por la mañana</li>
                <li>Parte del cuerpo donde se ve</li>
                <li>Lo opuesto de día</li>
            </ol>
            <div style="margin-top: 2rem;">
                <input type="text" placeholder="Respuesta 1H" class="form-control" style="margin: 0.5rem 0;">
                <input type="text" placeholder="Respuesta 2H" class="form-control" style="margin: 0.5rem 0;">
                <input type="text" placeholder="Respuesta 3H" class="form-control" style="margin: 0.5rem 0;">
                <button class="btn btn-primary" style="margin-top: 1rem;">Enviar</button>
            </div>
        </div>
    `;
}

function iniciarTrivia() {
    const preguntas = [
        {
            pregunta: "¿Cuál es el planeta más grande del sistema solar?",
            opciones: ["Tierra", "Júpiter", "Saturno", "Neptuno"],
            respuesta: 1
        },
        {
            pregunta: "¿En qué año se inventó la bombilla?",
            opciones: ["1879", "1885", "1900", "1920"],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál es la capital de Francia?",
            opciones: ["Lyon", "París", "Marsella", "Toulouse"],
            respuesta: 1
        }
    ];

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    
    let preguntaActual = 0;
    let puntuacion = 0;

    function mostrarPregunta() {
        const preg = preguntas[preguntaActual];
        gameContainer.innerHTML = `
            <h3>Trivia - Pregunta ${preguntaActual + 1}/${preguntas.length}</h3>
            <h4>${preg.pregunta}</h4>
            <div style="margin: 2rem 0;">
                ${preg.opciones.map((opcion, idx) => `
                    <button class="btn btn-secondary" style="display: block; width: 100%; margin: 0.5rem 0; text-align: left;" 
                            onclick="responderTrivia(${idx}, ${preg.respuesta})">
                        ${String.fromCharCode(65 + idx)}) ${opcion}
                    </button>
                `).join('')}
            </div>
            <p style="margin-top: 2rem; font-weight: bold;">Puntuación: ${puntuacion}/${preguntas.length}</p>
        `;
    }

    window.responderTrivia = function(seleccionado, correcta) {
        if (seleccionado === correcta) {
            puntuacion++;
            alert('¡Correcto! 🎉');
        } else {
            alert('Incorrecto 😢');
        }
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            gameContainer.innerHTML = `
                <h3>¡Trivia Completada!</h3>
                <h2>Puntuación Final: ${puntuacion}/${preguntas.length}</h2>
                <button class="btn btn-primary" onclick="changeSection('juegos')">Volver</button>
            `;
        }
    };

    mostrarPregunta();
}

function validarSudoku() {
    alert('Funcionalidad de validación de Sudoku. En producción, aquí iría la lógica de validación.');
}

function limpiarSudoku() {
    document.querySelectorAll('.sudoku-cell').forEach(cell => cell.value = '');
}

// ============================================================
// PANEL ADMIN
// ============================================================

function renderAdmin() {
    // Mostrar noticias guardadas
    const noticiasList = document.getElementById('noticiasList');
    noticiasList.innerHTML = `
        <h4>Noticias Publicadas:</h4>
        ${siteData.noticias.map(noticia => `
            <div class="admin-item">
                <div>
                    <strong>${noticia.titulo}</strong>
                    <p style="color: #636e72; font-size: 0.9rem; margin-top: 0.5rem;">${new Date(noticia.fecha).toLocaleDateString('es-ES')}</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn btn-secondary" onclick="editarNoticia(${noticia.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarNoticia(${noticia.id})">Eliminar</button>
                </div>
            </div>
        `).join('')}
    `;

    // Formulario para agregar noticia
    document.getElementById('formNoticia').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea');
        const nuevaNoticia = {
            id: Math.max(...siteData.noticias.map(n => n.id), 0) + 1,
            titulo: inputs[0].value,
            contenido: inputs[1].value,
            imagen: inputs[2].value || 'https://via.placeholder.com/400x200?text=Noticia',
            fecha: inputs[3].value
        };
        siteData.noticias.unshift(nuevaNoticia);
        guardarDatos();
        renderAdmin();
        e.target.reset();
        alert('¡Noticia publicada exitosamente!');
    });

    // Noticias en recetas
    const recetasList = document.getElementById('recetasList');
    recetasList.innerHTML = `
        <h4>Recetas Publicadas:</h4>
        ${siteData.recetas.map(receta => `
            <div class="admin-item">
                <div>
                    <strong>${receta.nombre}</strong>
                    <p style="color: #636e72; font-size: 0.9rem; margin-top: 0.5rem;">${receta.categoria}</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn btn-secondary" onclick="editarReceta(${receta.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarReceta(${receta.id})">Eliminar</button>
                </div>
            </div>
        `).join('')}
    `;

    // Formulario para agregar receta
    document.getElementById('formReceta').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea, select');
        const nuevaReceta = {
            id: Math.max(...siteData.recetas.map(r => r.id), 0) + 1,
            nombre: inputs[0].value,
            categoria: inputs[1].value,
            ingredientes: inputs[2].value.split('\n').filter(i => i.trim()),
            instrucciones: inputs[3].value,
            imagen: inputs[4].value || 'https://via.placeholder.com/400x200?text=Receta',
            tiempo: parseInt(inputs[5].value)
        };
        siteData.recetas.push(nuevaReceta);
        guardarDatos();
        renderAdmin();
        e.target.reset();
        alert('¡Receta publicada exitosamente!');
    });

    // Entretenimiento
    document.getElementById('formEntretenimiento').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea, select');
        const nuevoItem = {
            id: Math.max(...siteData.entretenimiento.map(e => e.id), 0) + 1,
            tipo: inputs[0].value,
            titulo: inputs[1].value,
            contenido: inputs[2].value,
            imagen: inputs[3].value || 'https://via.placeholder.com/400x200?text=Contenido'
        };
        siteData.entretenimiento.push(nuevoItem);
        guardarDatos();
        renderAdmin();
        e.target.reset();
        alert('¡Contenido publicado exitosamente!');
    });

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            const tabId = e.target.dataset.adminTab;
            document.getElementById('admin' + tabId.charAt(0).toUpperCase() + tabId.slice(1)).classList.add('active');
        });
    });
}

function eliminarNoticia(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
        siteData.noticias = siteData.noticias.filter(n => n.id !== id);
        guardarDatos();
        renderAdmin();
    }
}

function eliminarReceta(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
        siteData.recetas = siteData.recetas.filter(r => r.id !== id);
        guardarDatos();
        renderAdmin();
    }
}

function editarNoticia(id) {
    alert('Función de edición - Implementar según necesidad');
}

function editarReceta(id) {
    alert('Función de edición - Implementar según necesidad');
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    renderNoticias();
    renderRecetas();
    renderEntretenimiento();

    // Navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            changeSection(link.dataset.section);
        });
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});
