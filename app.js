// app.js

// CMS Data Management
const data = {
    noticias: [],
    recetas: [],
    entretenimiento: {
        juegos: []
    }
};

// Navigation
function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// Noticias Rendering
function renderNoticias() {
    const noticiasContainer = document.getElementById('noticias');
    noticiasContainer.innerHTML = '';
    data.noticias.forEach(noticia => {
        const noticiaElement = document.createElement('div');
        noticiaElement.innerText = noticia.title;
        noticiasContainer.appendChild(noticiaElement);
    });
}

// Recetas Filtering and Display
function filterRecetas(criteria) {
    return data.recetas.filter(receta => receta.category === criteria);
}

function displayRecetas(recetas) {
    const recetasContainer = document.getElementById('recetas');
    recetasContainer.innerHTML = '';
    recetas.forEach(receta => {
        const recetaElement = document.createElement('div');
        recetaElement.innerText = receta.title;
        recetasContainer.appendChild(recetaElement);
    });
}

// Entretainment Tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Juegos Functions (Sudoku, Crucigrama, Trivia)
function startJuego(juego) {
    console.log(`Iniciando juego: ${juego}`);
    // Logic for games goes here
}

// Admin Panel with Forms
function submitAdminForm(formData) {
    // Logic to handle form submission for the admin panel
}

// LocalStorage Persistence
function saveData() {
    localStorage.setItem('socialLiteData', JSON.stringify(data));
}

function loadData() {
    const savedData = JSON.parse(localStorage.getItem('socialLiteData'));
    if (savedData) {
        Object.assign(data, savedData);
    }
}

// Initialize on page load
window.onload = () => {
    loadData();
    renderNoticias();
};