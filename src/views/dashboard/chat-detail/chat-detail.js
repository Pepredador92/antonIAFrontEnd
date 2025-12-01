// ========================================
// CHAT DETAIL - JAVASCRIPT
// ========================================

// Estado del chat
let currentChat = null;
let currentUser = null;
let messages = [];
let pendingMessage = null;
let isWaitingForResponse = false;

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Cargar tema guardado
  loadTheme();
  
  // Cargar datos del usuario
  loadUserData();
  
  // Cargar chat actual
  loadCurrentChat();
  
  // Cargar mensajes
  loadMessages();
  
  // Renderizar mensajes
  renderMessages();
  
  // Mostrar botones de acción si es un chat nuevo
  checkInitialActions();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Scroll al final
  scrollToBottom();
  
  // Auto-resize del textarea
  adjustTextareaHeight();
});

// ========================================
// CARGA DE DATOS
// ========================================
function loadUserData() {
  const saved = localStorage.getItem('currentUser');
  if (saved) {
    currentUser = JSON.parse(saved);
  } else {
    // Redirigir a login si no hay usuario
    window.location.href = '/src/views/auth/login/login.html';
  }
}

function loadCurrentChat() {
  const chatId = localStorage.getItem('currentChatId');
  if (!chatId) {
    // Redirigir a lista de chats si no hay chat seleccionado
    window.location.href = '/src/views/dashboard/chat-list/chat-list.html';
    return;
  }
  
  // Cargar datos del chat
  const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
  currentChat = conversations.find(c => c.id === chatId);
  
  if (!currentChat) {
    window.location.href = '/src/views/dashboard/chat-list/chat-list.html';
    return;
  }
  
  // Actualizar UI con datos del cliente
  updateChatHeader();
}

function updateChatHeader() {
  const initials = getInitials(currentChat.clientName);
  document.getElementById('client-avatar').textContent = initials;
  document.getElementById('client-name').textContent = currentChat.clientName;
  document.getElementById('client-phone').textContent = currentChat.clientPhone;
}

function loadMessages() {
  const saved = localStorage.getItem(`messages_${currentChat.id}`);
  if (saved) {
    messages = JSON.parse(saved);
  } else {
    // Crear mensaje de bienvenida de AntonIA
    messages = [
      {
        id: `MSG${Date.now()}`,
        chatId: currentChat.id,
        sender: 'antonia',
        text: `¡Hola! Soy AntonIA, tu asistente de ventas 🤖\n\n¿En qué puedo ayudarte con ${currentChat.clientName}?`,
        timestamp: Date.now(),
        status: 'sent'
      }
    ];
    saveMessages();
  }
}

function saveMessages() {
  localStorage.setItem(`messages_${currentChat.id}`, JSON.stringify(messages));
  
  // Actualizar último mensaje en la conversación
  updateConversationLastMessage();
}

function updateConversationLastMessage() {
  const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
  const conversation = conversations.find(c => c.id === currentChat.id);
  
  if (conversation && messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    conversation.lastMessage = lastMsg.text.substring(0, 50) + (lastMsg.text.length > 50 ? '...' : '');
    conversation.timestamp = lastMsg.timestamp;
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }
}

function checkInitialActions() {
  // Mostrar botones de acción solo si hay exactamente 1 mensaje (el saludo de AntonIA)
  const actionButtons = document.getElementById('action-buttons');
  if (messages.length === 1 && messages[0].sender === 'antonia') {
    actionButtons.classList.remove('hidden');
  }
}

// ========================================
// RENDERIZADO
// ========================================
function renderMessages() {
  const container = document.getElementById('messages-container');
  container.innerHTML = messages.map(msg => createMessageElement(msg)).join('');
}

function createMessageElement(message) {
  const isReceived = message.sender === 'antonia';
  const messageClass = isReceived ? 'received' : 'sent';
  const avatar = isReceived ? 'AI' : getInitials(currentUser.name);
  const time = formatTime(message.timestamp);
  const statusIcon = getStatusIcon(message.status);
  
  return `
    <div class="message ${messageClass}" data-message-id="${message.id}">
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <div class="message-bubble">
          <p class="message-text">${escapeHtml(message.text)}</p>
        </div>
        <div class="message-time">
          ${time} ${!isReceived ? statusIcon : ''}
        </div>
      </div>
    </div>
  `;
}

function getStatusIcon(status) {
  const icons = {
    sending: '<span class="message-status sending">Enviando</span>',
    sent: '<span class="message-status sent">Enviado</span>',
    error: '<span class="message-status error">Error</span>'
  };
  return icons[status] || '';
}

function appendMessage(message) {
  const container = document.getElementById('messages-container');
  container.insertAdjacentHTML('beforeend', createMessageElement(message));
  scrollToBottom(true);
}

// ========================================
// ENVÍO DE MENSAJES
// ========================================
function sendMessage(text) {
  if (!text.trim() || isWaitingForResponse) return;
  
  // Ocultar botones de acción si estaban visibles
  document.getElementById('action-buttons').classList.add('hidden');
  
  // Crear mensaje
  const message = {
    id: `MSG${Date.now()}`,
    chatId: currentChat.id,
    sender: 'user',
    text: text.trim(),
    timestamp: Date.now(),
    status: 'sending'
  };
  
  // Guardar como mensaje pendiente
  pendingMessage = message;
  
  // Agregar a la lista y renderizar
  messages.push(message);
  appendMessage(message);
  saveMessages();
  
  // Limpiar input
  const input = document.getElementById('message-input');
  input.value = '';
  adjustTextareaHeight();
  document.getElementById('send-btn').disabled = true;
  
  // Registrar acción
  logAction('send_message', {
    chatId: currentChat.id,
    messageLength: text.length
  });
  
  // Simular envío
  setTimeout(() => {
    simulateSendMessage(message);
  }, 500);
}

function simulateSendMessage(message) {
  // Simular éxito o error (90% éxito, 10% error)
  const success = Math.random() > 0.1;
  
  if (success) {
    message.status = 'sent';
    pendingMessage = null;
    updateMessageStatus(message.id, 'sent');
    saveMessages();
    
    // Ocultar banner de error si estaba visible
    document.getElementById('error-banner').classList.add('hidden');
    
    // Simular respuesta de AntonIA después de un delay
    isWaitingForResponse = true;
    setTimeout(() => {
      sendAntonIAResponse(message.text);
      isWaitingForResponse = false;
    }, 1000 + Math.random() * 1000);
  } else {
    message.status = 'error';
    updateMessageStatus(message.id, 'error');
    
    // Mostrar banner de error
    document.getElementById('error-banner').classList.remove('hidden');
  }
}

function updateMessageStatus(messageId, status) {
  const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
  if (messageElement) {
    const timeElement = messageElement.querySelector('.message-time');
    const time = formatTime(Date.now());
    const statusIcon = getStatusIcon(status);
    timeElement.innerHTML = `${time} ${statusIcon}`;
  }
}

function sendAntonIAResponse(userMessage) {
  // Generar respuesta contextual basada en el mensaje del usuario
  let responseText = generateAntonIAResponse(userMessage);
  
  const response = {
    id: `MSG${Date.now()}`,
    chatId: currentChat.id,
    sender: 'antonia',
    text: responseText,
    timestamp: Date.now(),
    status: 'sent'
  };
  
  messages.push(response);
  appendMessage(response);
  saveMessages();
}

function generateAntonIAResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  // Respuestas contextuales simples
  if (lowerMsg.includes('cotiza') || lowerMsg.includes('precio') || lowerMsg.includes('costo')) {
    return 'Perfecto, voy a ayudarte con la cotización. ¿Qué producto te interesa cotizar para el cliente?';
  }
  
  if (lowerMsg.includes('recomiend') || lowerMsg.includes('producto') || lowerMsg.includes('sugerir')) {
    return '¡Claro! Para recomendarte el mejor producto, cuéntame: ¿qué necesita el cliente? ¿Para qué lo va a usar?';
  }
  
  if (lowerMsg.includes('política') || lowerMsg.includes('garantía') || lowerMsg.includes('devolución')) {
    return 'Entendido. Te comparto las políticas relevantes:\n\n• Garantía: 30 días en todos los productos\n• Devoluciones: Hasta 15 días con ticket\n• Cambios: Sin costo en la misma sucursal\n\n¿Necesitas algo más específico?';
  }
  
  if (lowerMsg.includes('gracias') || lowerMsg.includes('perfecto') || lowerMsg.includes('ok')) {
    return '¡Con gusto! ¿Hay algo más en lo que pueda ayudarte con este cliente?';
  }
  
  // Respuesta genérica
  return 'Entiendo. ¿Podrías darme más detalles para ayudarte mejor? También puedo ayudarte a:\n\n💰 Hacer una cotización\n⭐ Recomendar productos\n📋 Consultar políticas';
}

// ========================================
// ACCIONES INICIALES
// ========================================
function handleActionClick(action) {
  // Ocultar botones
  document.getElementById('action-buttons').classList.add('hidden');
  
  // Enviar mensaje según la acción seleccionada
  let actionText = '';
  
  switch(action) {
    case 'quote':
      actionText = 'Quiero hacer una cotización';
      break;
    case 'recommend':
      actionText = 'Necesito recomendación de producto';
      break;
  }
  
  if (actionText) {
    sendMessage(actionText);
    
    // Registrar acción
    logAction(action, {
      chatId: currentChat.id,
      clientName: currentChat.clientName
    });
  }
}

// ========================================
// REINTENTAR ENVÍO
// ========================================
function retryMessage() {
  if (pendingMessage) {
    pendingMessage.status = 'sending';
    updateMessageStatus(pendingMessage.id, 'sending');
    
    setTimeout(() => {
      simulateSendMessage(pendingMessage);
    }, 500);
  }
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
  // Tema oscuro
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Botón volver
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = '/src/views/dashboard/chat-list/chat-list.html';
  });
  
  // Input de mensaje
  const input = document.getElementById('message-input');
  input.addEventListener('input', handleInputChange);
  input.addEventListener('keydown', handleInputKeydown);
  
  // Botón enviar
  document.getElementById('send-btn').addEventListener('click', handleSendClick);
  
  // Botones de acción
  document.querySelectorAll('.btn-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      handleActionClick(action);
    });
  });
  
  // Botón reintentar
  document.getElementById('retry-btn').addEventListener('click', retryMessage);
}

function handleInputChange(e) {
  const text = e.target.value;
  const sendBtn = document.getElementById('send-btn');
  sendBtn.disabled = !text.trim() || isWaitingForResponse;
  adjustTextareaHeight();
}

function handleInputKeydown(e) {
  // Enter sin Shift = enviar, Enter con Shift = nueva línea
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendClick();
  }
}

function handleSendClick() {
  const input = document.getElementById('message-input');
  const text = input.value;
  if (text.trim() && !isWaitingForResponse) {
    sendMessage(text);
  }
}

function adjustTextareaHeight() {
  const input = document.getElementById('message-input');
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
}

// ========================================
// REGISTRO DE ACCIONES
// ========================================
function logAction(action, data) {
  const log = {
    timestamp: new Date().toISOString(),
    vendorId: currentUser.id,
    branchId: currentUser.branch.id,
    chatId: currentChat.id,
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

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('es-MX', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function scrollToBottom(smooth = false) {
  const area = document.getElementById('messages-area');
  const scrollOptions = smooth ? { behavior: 'smooth' } : {};
  setTimeout(() => {
    area.scrollTo({
      top: area.scrollHeight,
      ...scrollOptions
    });
  }, 100);
}
