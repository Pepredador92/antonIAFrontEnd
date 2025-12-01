// branch-selection.js - Lógica visual para vista unificada

// Estado visual (no persistencia real)
let selectedBranch = null;

// ========== MODO OSCURO ==========
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

console.log('Theme switch element:', themeSwitch);

if (!themeSwitch) {
  console.error('Theme switch not found!');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
console.log('Saved theme:', savedTheme);

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
  console.log('Dark mode activated from storage');
}

// Toggle de tema
if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    console.log('Theme switch changed:', themeSwitch.checked);
    if (themeSwitch.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      console.log('Dark mode ON');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      console.log('Dark mode OFF');
    }
    console.log('Body classes:', body.className);
  });
}
// =================================

// Referencias DOM
const branchSearch = document.getElementById('branch-search');
const loginForm = document.getElementById('login-form');
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const errorText = document.getElementById('error-text');

// Botones de selección de sucursal
const selectButtons = document.querySelectorAll('.btn-select-branch');

selectButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.branch-card');
    const branchId = card.getAttribute('data-branch-id');
    const branchName = card.querySelector('.branch-name').textContent;
    const branchLocation = card.querySelector('.branch-location').textContent;
    
    // Guardar selección
    selectedBranch = { id: branchId, name: branchName, location: branchLocation };
    
    // Marcar visualmente la tarjeta seleccionada
    document.querySelectorAll('.branch-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    console.log('Sucursal seleccionada:', selectedBranch);
  });
});



// Buscador de sucursales (filtrado visual)
branchSearch.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const allCards = document.querySelectorAll('.branch-card');
  
  allCards.forEach(card => {
    const name = card.querySelector('.branch-name').textContent.toLowerCase();
    const location = card.querySelector('.branch-location').textContent.toLowerCase();
    
    if (name.includes(searchTerm) || location.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

// Toggle mostrar/ocultar contraseña
togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Submit del login (simulado)
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Validar que hay sucursal seleccionada
  if (!selectedBranch) {
    showError('Por favor selecciona una sucursal primero');
    return;
  }
  
  // Simulación: mostrar error si campos vacíos
  if (!username || !password) {
    showError('Por favor completa todos los campos');
    return;
  }
  
  // Simulación: mostrar error genérico (placeholder para lógica real)
  showError('Credenciales inválidas. Verifica tu usuario y contraseña.');
  
  // TODO: Aquí iría la lógica real de autenticación
  console.log('Login attempt:', { username, branch: selectedBranch });
});

// Mostrar mensaje de error
function showError(message) {
  errorText.textContent = message;
  loginError.classList.remove('hidden');
}

// Enlaces (placeholders)
document.getElementById('forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Funcionalidad de recuperación de contraseña (placeholder)');
});

document.getElementById('link-register').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Funcionalidad de registro (placeholder)');
});
