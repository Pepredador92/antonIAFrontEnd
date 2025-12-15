from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='.')

# Configurar la carpeta base
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta principal - index.html
@app.route('/')
def index():
    return send_file(os.path.join(BASE_DIR, 'index.html'))

# Servir archivos estáticos (CSS, JS, imágenes)
@app.route('/public/<path:filename>')
def public_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'public'), filename)

@app.route('/assets/<path:filename>')
def assets_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'assets'), filename)

# Vistas de autenticación
@app.route('/login')
def login():
    return send_file(os.path.join(BASE_DIR, 'src/views/auth/login/login.html'))

@app.route('/register')
def register():
    return send_file(os.path.join(BASE_DIR, 'src/views/auth/register/register.html'))

# Vistas del dashboard
@app.route('/dashboard/chat-list')
def chat_list():
    return send_file(os.path.join(BASE_DIR, 'src/views/dashboard/chat-list/chat-list.html'))

@app.route('/dashboard/chat-detail')
def chat_detail():
    return send_file(os.path.join(BASE_DIR, 'src/views/dashboard/chat-detail/chat-detail.html'))

@app.route('/dashboard/chat-recommendation')
def chat_recommendation():
    return send_file(os.path.join(BASE_DIR, 'src/views/dashboard/chat-recommendation/chat-recommendation.html'))

# Servir archivos CSS y JS de las vistas
@app.route('/src/<path:filename>')
def src_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'src'), filename)

if __name__ == '__main__':
    print("🚀 Servidor iniciado en http://localhost:8000")
    print("\nRutas disponibles:")
    print("  - http://localhost:8000/")
    print("  - http://localhost:8000/login")
    print("  - http://localhost:8000/register")
    print("  - http://localhost:8000/dashboard/chat-list")
    print("  - http://localhost:8000/dashboard/chat-detail")
    print("  - http://localhost:8000/dashboard/chat-recommendation")
    app.run(debug=True, host='0.0.0.0', port=8000)
