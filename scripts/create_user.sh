#!/bin/bash

echo "👤 Crear nuevo usuario en la base de datos SudoGest"
read -p "Introduce el nombre de usuario: " nombre
read -p "Introduce el rol (admin/user): " rol

docker exec -i sudogest-db-1 mysql -uadmin -padmin123 sudogest -e \
"INSERT INTO usuarios (username, rol) VALUES ('$nombre', '$rol');"

echo "✅ Usuario '$nombre' con rol '$rol' creado correctamente."
