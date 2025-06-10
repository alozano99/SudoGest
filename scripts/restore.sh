#!/bin/bash

echo "📂 Restauración de base de datos iniciada..."

# Pedir el nombre del archivo SQL a restaurar
read -p "Introduce el nombre del archivo .sql (ej: sudogest_2025-06-07_12-00.sql): " SQL_FILE

# Verificar si el archivo existe
if [ ! -f backups/$SQL_FILE ]; then
  echo "❌ Error: El archivo backups/$SQL_FILE no existe."
  exit 1
fi

# Ejecutar restauración
cat backups/$SQL_FILE | docker exec -i sudogest-db-1 mysql -uadmin -padmin123 sudogest

echo "✅ Restauración completada desde $SQL_FILE"
