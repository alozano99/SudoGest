#!/bin/bash

echo "🔥 Configurando firewall con UFW..."

# Restablece configuración previa
ufw --force reset

# Política por defecto: denegar todo
ufw default deny incoming
ufw default allow outgoing

# Permitir SSH (gestión remota)
ufw allow 22

# Permitir tráfico web HTTP/HTTPS
ufw allow 80
ufw allow 443

# (Opcional) Permitir acceso al backend/API directamente si necesario
ufw allow 3000
ufw allow 3001

# ufw allow from IP_PUBLICA to any port 3306 #(Para permitir acceso MySQL desde nuestra IP)

# Activar el firewall
ufw --force enable

echo "✅ Firewall activado con reglas básicas de seguridad."
ufw status numbered
