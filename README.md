# 🧠 SudoGest – Sistema de gestió d'usuaris i rol

**SudoGest** és una aplicació client-servidor desplegada amb contenidors Docker que permet gestionar usuaris i rols de forma distribuïda i escalable. Està formada per un frontend en React, dos APIs en Node.js, una base de dades MySQL i un balançador de càrrega amb NGINX.

## 🌐 Enllaç públic
Accedeix-hi aquí: [http://sudogest.alozano.cat](http://sudogest.alozano.cat)

---

## 🧱 Arquitectura del sistema
[Usuari] ⇄ [NGINX - port 80/443]
⇅
┌───────────────┬───────────────┐
↓ ↓ ↓
[API1:3000] [API2:3000] [MySQL:3306]

### Components:
- `frontend/` → React app servida amb `serve`
- `backend_api1/` i `backend_api2/` → Node.js amb Express
- `db/` → MySQL 8.0
- `nginx/` → Proxy invers i balanç de càrrega
- `script.sql` → Inicialització de la BBDD
- `docker-compose.yml` → Orquestració total

---

## 📦 Instal·lació

### Requisits:
- Docker i Docker Compose
- AWS EC2 instance (o qualsevol servidor Linux)
- Cloudflare per gestionar DNS i HTTPS (opcional)

### Pasos:

git clone https://github.com/alozano99/SudoGest.git
cd SudoGest

# OPCIONAL: netejar residus
docker system prune -a --volumes -f

# Iniciar el sistema
docker-compose up -d --build

🔧 Funcionalitats

    Creació d’usuaris amb rol predeterminat

    Inicialització de base de dades (POST /dbinit)

    Creació de taules (POST /tbinit)

    Visualització de llistat d’usuaris

    Load Balancing actiu entre API1 i API2

    Còpia de seguretat (backup.sh) i restauració (restore.sh)

    Tallafocs i seguretat de serveis

    Enllaç amb domini i HTTPS

🔧 Funcionalitats

    Creació d’usuaris amb rol predeterminat

    Inicialització de base de dades (POST /dbinit)

    Creació de taules (POST /tbinit)

    Visualització de llistat d’usuaris

    Load Balancing actiu entre API1 i API2

    Còpia de seguretat (backup.sh) i restauració (restore.sh)

    Tallafocs i seguretat de serveis

    Enllaç amb domini i HTTPS

🛠️  Scripts

./backup.sh         # Realitza còpia de seguretat de la BBDD
./restore.sh        # Restaura una còpia anterior
./firewall.sh       # Aplica regles bàsiques de seguretat

🌍 Domini i DNS

    Domini: sudogest.alozano.cat

    Proveïdor DNS: Cloudflare

    IP Pública: 54.xxx.xxx.xxx

📁 Estructura de carpetes
SudoGest/
├── backend_api1/
├── backend_api2/
├── frontend/
├── script.sql
├── docker-compose.yml
├── nginx.conf
├── backup.sh / restore.sh / firewall.sh
└── README.md

🧪 Comprovacions

    /whoami mostra quin backend està servint la petició (API1 o API2)

    Accés per IP o domini funciona per http://...

    Docker ps mostra 5 contenidors actius: frontend, api1, api2, db, nginx

👤 Autor

    Alumne: Alex Lozano Rueda

    Centre: Institut TIC de Barcelona

    Any: 2024–2025
