// ========================================
// CHAT RECOMMENDATION - JAVASCRIPT (DEMO)
// ========================================

// Este es un archivo de demostración visual
// La funcionalidad real se implementará después

document.addEventListener('DOMContentLoaded', function() {
  // Cargar tema guardado
  loadTheme();
  
  // Configurar event listeners básicos
  setupEventListeners();
  
  // Scroll al final
  scrollToBottom();
});

// ========================================
// TEMA OSCURO
// ========================================
function loadTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const themeSwitch = document.getElementById('theme-switch');
  
  if (isDark) {
    document.body.classList.add('dark-mode');
    if (themeSwitch) themeSwitch.checked = true;
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
  // Tema oscuro
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    themeSwitch.addEventListener('change', toggleTheme);
  }
  
  // Botón volver
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '/src/views/dashboard/chat-detail/chat-detail.html';
    });
  }
  
  // Auto-resize del textarea
  const input = document.getElementById('message-input');
  if (input) {
    input.addEventListener('input', adjustTextareaHeight);
  }
  
  // Efectos visuales en chips (demo)
  document.querySelectorAll('.chip-option').forEach(chip => {
    chip.addEventListener('click', () => {
      console.log('Chip seleccionado:', chip.textContent);
      // Aquí iría la lógica para enviar la respuesta
    });
  });
  
  // Efectos visuales en botones de acción (demo)
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Acción seleccionada:', btn.textContent);
      // Aquí iría la lógica para ejecutar la acción
    });
  });
  
  // Efectos visuales en botones de productos (demo)
  document.querySelectorAll('.btn-add-quote').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Producto agregado a cotización');
      this.textContent = '✓ Agregado';
      this.style.background = '#28a745';
      setTimeout(() => {
        this.textContent = '+ Agregar a cotización';
        this.style.background = '';
      }, 2000);
    });
  });
}

function adjustTextareaHeight() {
  const input = document.getElementById('message-input');
  if (input) {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }
}

// ========================================
// UTILIDADES
// ========================================
function scrollToBottom(smooth = false) {
  const area = document.getElementById('messages-area');
  if (area) {
    const scrollOptions = smooth ? { behavior: 'smooth' } : {};
    setTimeout(() => {
      area.scrollTo({
        top: area.scrollHeight,
        ...scrollOptions
      });
    }, 100);
  }
}

// Log para desarrollo
console.log('🎨 Vista de demostración de Chat Recommendation cargada');
console.log('💡 Esta es una vista estática para mostrar el diseño');
console.log('🔧 La funcionalidad se implementará en la siguiente fase');
