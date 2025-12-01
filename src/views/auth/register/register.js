// register.js - Lógica visual para registro de usuarios

// ========== MODO OSCURO ==========
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

if (!themeSwitch) {
  console.error('Theme switch not found!');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
}

// Toggle de tema
if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
}
// =================================

// Referencias DOM
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const errorText = document.getElementById('error-text');

// Password toggles
const togglePassword = document.getElementById('toggle-password');
const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Toggle mostrar/ocultar contraseña
togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

toggleConfirmPassword.addEventListener('click', () => {
  const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
  confirmPasswordInput.type = type;
  toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Validación y submit del formulario
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Obtener valores
  const name = document.getElementById('name').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const countryCode = document.getElementById('country-code').value;
  const phone = document.getElementById('phone').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const terms = document.getElementById('terms').checked;
  
  // Validaciones
  if (!name || !lastname || !phone || !birthdate || !email || !password || !confirmPassword) {
    showError('Por favor completa todos los campos obligatorios');
    return;
  }
  
  if (!terms) {
    showError('Debes aceptar los términos y condiciones');
    return;
  }
  
  if (password.length < 8) {
    showError('La contraseña debe tener al menos 8 caracteres');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('Las contraseñas no coinciden');
    return;
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Por favor ingresa un correo electrónico válido');
    return;
  }
  
  // Validar teléfono (solo números)
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    showError('El teléfono solo debe contener números');
    return;
  }
  
  // Validar fecha de nacimiento (mayor de 18 años)
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 18) {
    showError('Debes ser mayor de 18 años para registrarte');
    return;
  }
  
  // Simulación: registro exitoso
  console.log('Registro exitoso:', {
    name,
    lastname,
    phone: `${countryCode} ${phone}`,
    birthdate,
    email
  });
  
  // Guardar usuario en localStorage
  const userData = {
    name,
    lastname,
    email,
    phone: `${countryCode} ${phone}`,
    birthdate
  };
  localStorage.setItem('registeredUser', JSON.stringify(userData));
  
  // Ocultar error si estaba visible
  hideError();
  
  // Redirigir a la vista de inicio de sesión
  window.location.href = '/src/views/auth/login/login.html';
}, false);

// Mostrar mensaje de error
function showError(message) {
  errorText.textContent = message;
  registerError.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ocultar mensaje de error
function hideError() {
  registerError.classList.add('hidden');
}

// Link a términos y condiciones
document.querySelector('.link-terms')?.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Términos y condiciones (placeholder)');
});
