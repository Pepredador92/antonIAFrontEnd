#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse, parse_qs

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parsear la URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Rutas personalizadas
        if path == '/':
            self.path = '/index.html'
        elif path == '/login':
            self.path = '/src/views/auth/login/login.html'
        elif path == '/register':
            self.path = '/src/views/auth/register/register.html'
        elif path == '/dashboard/chat-list':
            self.path = '/src/views/dashboard/chat-list/chat-list.html'
        elif path == '/dashboard/chat-detail':
            self.path = '/src/views/dashboard/chat-detail/chat-detail.html'
        elif path == '/dashboard/chat-recommendation':
            self.path = '/src/views/dashboard/chat-recommendation/chat-recommendation.html'
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"🚀 Servidor iniciado en http://localhost:{PORT}")
    print("\nRutas disponibles:")
    print(f"  - http://localhost:{PORT}/")
    print(f"  - http://localhost:{PORT}/login")
    print(f"  - http://localhost:{PORT}/register")
    print(f"  - http://localhost:{PORT}/dashboard/chat-list")
    print(f"  - http://localhost:{PORT}/dashboard/chat-detail")
    print(f"  - http://localhost:{PORT}/dashboard/chat-recommendation")
    print("\nPresiona Ctrl+C para detener el servidor")
    httpd.serve_forever()
