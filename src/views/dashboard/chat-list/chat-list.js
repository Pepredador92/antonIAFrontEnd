// ========================================
// CHAT LIST - JAVASCRIPT
// ========================================

// Datos del usuario logueado (simulado desde localStorage)
let currentUser = {
  id: 'V001',
  name: 'Juan Pérez',
  branch: {
    id: 'SUC001',
    name: 'Sucursal Centro'
  }
};

// Conversaciones (persistidas en localStorage)
let conversations = [];

// Estado de búsqueda
let searchQuery = '';

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Cargar tema guardado
  loadTheme();
  
  // Cargar datos del usuario
  loadUserData();
  
  // Cargar conversaciones
  loadConversations();
  
  // Renderizar lista
  renderConversations();
  
  // Configurar event listeners
  setupEventListeners();
});

// ========================================
// CARGA DE DATOS
// ========================================
function loadUserData() {
  // Intentar cargar datos del localStorage
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  
  // Actualizar UI
  const initials = getInitials(currentUser.name);
  document.getElementById('avatar-initials').textContent = initials;
  document.getElementById('user-name').textContent = currentUser.name;
  document.getElementById('branch-name').textContent = currentUser.branch.name;
}

function loadConversations() {
  const saved = localStorage.getItem('conversations');
  if (saved) {
    conversations = JSON.parse(saved);
  } else {
    // Datos de ejemplo para demostración
    conversations = [
      {
        id: 'CHAT001',
        clientId: 'CLI001',
        clientName: 'María González',
        clientPhone: '55 1234 5678',
        lastMessage: '¿Tienen disponibilidad de ese producto?',
        timestamp: Date.now() - 3600000, // Hace 1 hora
        unreadCount: 2,
        isPinned: true,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT002',
        clientId: 'CLI002',
        clientName: 'Carlos Ramírez',
        clientPhone: '55 9876 5432',
        lastMessage: 'Gracias por la cotización',
        timestamp: Date.now() - 7200000, // Hace 2 horas
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT003',
        clientId: 'CLI003',
        clientName: 'Ana Martínez',
        clientPhone: '55 5555 1234',
        lastMessage: '¿Cuándo puedo pasar a recogerlo?',
        timestamp: Date.now() - 86400000, // Hace 1 día
        unreadCount: 1,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT004',
        clientId: 'CLI004',
        clientName: 'Luis Hernández',
        clientPhone: '55 2222 3333',
        lastMessage: '¿Aceptan tarjeta de crédito?',
        timestamp: Date.now() - 172800000, // Hace 2 días
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT005',
        clientId: 'CLI005',
        clientName: 'Patricia Sánchez',
        clientPhone: '55 4444 5555',
        lastMessage: 'Necesito hacer una devolución',
        timestamp: Date.now() - 259200000, // Hace 3 días
        unreadCount: 3,
        isPinned: true,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT006',
        clientId: 'CLI006',
        clientName: 'Roberto Torres',
        clientPhone: '55 6666 7777',
        lastMessage: 'Me interesa el modelo que me mostraste',
        timestamp: Date.now() - 345600000, // Hace 4 días
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT007',
        clientId: 'CLI007',
        clientName: 'Sofía Jiménez',
        clientPhone: '55 8888 9999',
        lastMessage: '¿Tienen garantía extendida?',
        timestamp: Date.now() - 432000000, // Hace 5 días
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT008',
        clientId: 'CLI008',
        clientName: 'Miguel Ángel Cruz',
        clientPhone: '55 1111 2222',
        lastMessage: 'Ya pasé por el producto, muchas gracias',
        timestamp: Date.now() - 518400000, // Hace 6 días
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT009',
        clientId: 'CLI009',
        clientName: 'Diana López',
        clientPhone: '55 3333 4444',
        lastMessage: '¿Cuál es el horario de la tienda?',
        timestamp: Date.now() - 604800000, // Hace 7 días
        unreadCount: 1,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      },
      {
        id: 'CHAT010',
        clientId: 'CLI010',
        clientName: 'Fernando Ruiz',
        clientPhone: '55 5555 6666',
        lastMessage: 'Perfecto, nos vemos mañana',
        timestamp: Date.now() - 691200000, // Hace 8 días
        unreadCount: 0,
        isPinned: false,
        vendorId: currentUser.id,
        branchId: currentUser.branch.id
      }
    ];
    saveConversations();
  }
}

function saveConversations() {
  localStorage.setItem('conversations', JSON.stringify(conversations));
}

// ========================================
// RENDERIZADO
// ========================================
function renderConversations() {
  const listElement = document.getElementById('conversations-list');
  const emptyState = document.getElementById('empty-state');
  const noResultsState = document.getElementById('no-results-state');
  
  // Filtrar conversaciones
  const filtered = filterConversations();
  
  // Mostrar estado apropiado
  if (conversations.length === 0) {
    listElement.innerHTML = '';
    listElement.classList.add('hidden');
    emptyState.classList.remove('hidden');
    noResultsState.classList.add('hidden');
    return;
  }
  
  if (filtered.length === 0) {
    listElement.innerHTML = '';
    listElement.classList.add('hidden');
    emptyState.classList.add('hidden');
    noResultsState.classList.remove('hidden');
    return;
  }
  
  // Mostrar conversaciones
  listElement.classList.remove('hidden');
  emptyState.classList.add('hidden');
  noResultsState.classList.add('hidden');
  
  // Ordenar: primero ancladas, luego por timestamp
  const sorted = filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp - a.timestamp;
  });
  
  // Renderizar cada conversación
  listElement.innerHTML = sorted.map(conv => createConversationCard(conv)).join('');
}

function createConversationCard(conversation) {
  const initials = getInitials(conversation.clientName);
  const timeAgo = getTimeAgo(conversation.timestamp);
  const unreadBadge = conversation.unreadCount > 0 
    ? `<span class="unread-badge">${conversation.unreadCount}</span>` 
    : '';
  const pinnedClass = conversation.isPinned ? 'pinned' : '';
  
  return `
    <div class="conversation-card ${pinnedClass}" data-chat-id="${conversation.id}">
      <div class="client-avatar">${initials}</div>
      <div class="conversation-content">
        <div class="conversation-header">
          <h4 class="client-name">${conversation.clientName}</h4>
          <span class="conversation-time">${timeAgo}</span>
        </div>
        <div class="conversation-preview">
          <p class="last-message">${conversation.lastMessage}</p>
          ${unreadBadge}
        </div>
      </div>
      <button class="btn-pin" data-chat-id="${conversation.id}" title="${conversation.isPinned ? 'Desanclar' : 'Anclar'}">
        <img src="/public/img/pin-conversation.png" alt="Pin" class="pin-icon">
      </button>
    </div>
  `;
}

// ========================================
// FILTRADO Y BÚSQUEDA
// ========================================
function filterConversations() {
  if (!searchQuery) return conversations;
  
  const query = removeAccents(searchQuery.toLowerCase());
  
  return conversations.filter(conv => {
    const name = removeAccents(conv.clientName.toLowerCase());
    const phone = conv.clientPhone.replace(/\s/g, '');
    const message = removeAccents(conv.lastMessage.toLowerCase());
    
    return name.includes(query) || 
           phone.includes(query) || 
           message.includes(query);
  });
}

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
  // Tema oscuro
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Búsqueda
  const searchInput = document.getElementById('chat-search');
  searchInput.addEventListener('input', handleSearch);
  
  const clearSearchBtn = document.getElementById('clear-search');
  clearSearchBtn.addEventListener('click', clearSearch);
  
  // Botones de nuevo chat
  document.getElementById('new-chat-btn').addEventListener('click', openNewChatModal);
  document.getElementById('empty-new-chat').addEventListener('click', openNewChatModal);
  
  // Modal
  document.getElementById('close-modal').addEventListener('click', closeNewChatModal);
  document.getElementById('cancel-modal').addEventListener('click', closeNewChatModal);
  document.getElementById('modal-overlay').addEventListener('click', closeNewChatModal);
  document.getElementById('new-chat-form').addEventListener('submit', handleCreateChat);
  
  // Cerrar sesión
  document.getElementById('logout').addEventListener('click', handleLogout);
  
  // Delegación de eventos para las conversaciones
  document.getElementById('conversations-list').addEventListener('click', handleConversationClick);
}

function handleSearch(e) {
  searchQuery = e.target.value;
  const clearBtn = document.getElementById('clear-search');
  
  if (searchQuery) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }
  
  renderConversations();
}

function clearSearch() {
  document.getElementById('chat-search').value = '';
  searchQuery = '';
  document.getElementById('clear-search').classList.add('hidden');
  renderConversations();
}

function handleConversationClick(e) {
  // Click en botón de anclar
  if (e.target.classList.contains('btn-pin')) {
    e.stopPropagation();
    const chatId = e.target.dataset.chatId;
    togglePin(chatId);
    return;
  }
  
  // Click en la card completa
  const card = e.target.closest('.conversation-card');
  if (card) {
    const chatId = card.dataset.chatId;
    openChat(chatId);
  }
}

function togglePin(chatId) {
  const conversation = conversations.find(c => c.id === chatId);
  if (conversation) {
    conversation.isPinned = !conversation.isPinned;
    saveConversations();
    renderConversations();
    
    // Registrar acción
    logAction('pin_conversation', {
      chatId,
      isPinned: conversation.isPinned
    });
  }
}

function openChat(chatId) {
  const conversation = conversations.find(c => c.id === chatId);
  if (conversation) {
    // Marcar como leído
    conversation.unreadCount = 0;
    saveConversations();
    
    // Registrar acción
    logAction('open_chat', {
      chatId,
      clientName: conversation.clientName
    });
    
    // Guardar chat actual y navegar
    localStorage.setItem('currentChatId', chatId);
    window.location.href = '/src/views/dashboard/chat-detail/chat-detail.html';
  }
}

// ========================================
// MODAL NUEVO CHAT
// ========================================
function openNewChatModal() {
  const modal = document.getElementById('new-chat-modal');
  modal.classList.remove('hidden');
  document.getElementById('client-name').focus();
  
  // Limpiar formulario
  document.getElementById('new-chat-form').reset();
  document.getElementById('modal-error').classList.add('hidden');
}

function closeNewChatModal() {
  const modal = document.getElementById('new-chat-modal');
  modal.classList.add('hidden');
}

function handleCreateChat(e) {
  e.preventDefault();
  
  const clientId = document.getElementById('client-id').value.trim() || `CLI${Date.now()}`;
  const clientName = document.getElementById('client-name').value.trim();
  const clientPhone = document.getElementById('client-phone').value.trim();
  
  // Validar teléfono
  if (!validatePhone(clientPhone)) {
    showModalError('El teléfono no es válido. Debe contener al menos 10 dígitos.');
    return;
  }
  
  // Crear nueva conversación
  const newChat = {
    id: `CHAT${Date.now()}`,
    clientId,
    clientName,
    clientPhone,
    lastMessage: 'Conversación iniciada',
    timestamp: Date.now(),
    unreadCount: 0,
    isPinned: false,
    vendorId: currentUser.id,
    branchId: currentUser.branch.id
  };
  
  conversations.unshift(newChat);
  saveConversations();
  
  // Registrar acción
  logAction('create_chat', {
    chatId: newChat.id,
    clientName,
    clientPhone
  });
  
  // Cerrar modal y abrir chat
  closeNewChatModal();
  openChat(newChat.id);
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function showModalError(message) {
  const errorElement = document.getElementById('modal-error');
  const errorText = document.getElementById('modal-error-text');
  errorText.textContent = message;
  errorElement.classList.remove('hidden');
}

// ========================================
// ACCIONES DE HEADER
// ========================================
function handleLogout() {
  const confirm = window.confirm('¿Estás seguro que deseas cerrar sesión?');
  if (confirm) {
    logAction('logout', {
      vendorId: currentUser.id
    });
    localStorage.removeItem('currentUser');
    window.location.href = '/src/views/auth/login/login.html';
  }
}

// ========================================
// REGISTRO DE ACCIONES
// ========================================
function logAction(action, data) {
  const log = {
    timestamp: new Date().toISOString(),
    vendorId: currentUser.id,
    branchId: currentUser.branch.id,
    action,
    data
  };
  
  console.log('📊 Acción registrada:', log);
  
  // Guardar en localStorage para auditoría
  const logs = JSON.parse(localStorage.getItem('actionLogs') || '[]');
  logs.push(log);
  localStorage.setItem('actionLogs', JSON.stringify(logs));
}

// ========================================
// TEMA OSCURO
// ========================================
function loadTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const themeSwitch = document.getElementById('theme-switch');
  
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

// ========================================
// UTILIDADES
// ========================================
function getInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days}d`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}
