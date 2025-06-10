const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// Create the Express app
const corsOptions = {
  origin: ["http://localhost:3001", "http://sudogest.alozano.cat"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Para preflight

// Create a connection to the MySQL database
const mysqlConfig = {
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "sudogest",
};

let con = null;
const databaseInit = () => {
  con = mysql.createConnection(mysqlConfig);
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the database");
  });
};

const createDatabase = () => {
  con.query("CREATE DATABASE IF NOT EXISTS appdb", (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Database created successfully");
  });
};

const createTable = () => {
  con.query(
    "CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Table created successfully");
    }
  );
};

const runScriptSQL = () => {
  const sqlScript = fs.readFileSync("./script.sql").toString();
  con.query(sqlScript, (err, results) => {
    if (err) {
      console.error("Error executing SQL script:", err);
    } else {
      console.log("SQL script executed successfully");
    }
  });
};


// GET request
app.get("/user", (req, res) => {
  databaseInit();
  con.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(results);
    }
  });
});

// POST request
app.post("/user", (req, res) => {
  databaseInit();

  const nombre = req.body.name;
  const rol = req.body.rol || "user"; // por defecto 'user' si no se manda

  console.log("Nombre recibido:", nombre, "| Rol recibido:", rol);

  if (!nombre) {
    return res.status(400).send("Nombre no válido");
  }

  con.query(
    "INSERT INTO usuarios (username, rol) VALUES (?, ?)",
    [nombre, rol],
    (err, results) => {
      if (err) {
        console.error("Error al insertar:", err);
        res.status(500).send("Error en la base de datos");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/dbinit", (req, res) => {
  databaseInit();
  runScriptSQL();
  res.json("Base de datos y tablas creadas con éxito");
});

app.post("/tbinit", (req, res) => {
  databaseInit();
  runScriptSQL();
  res.json("Script SQL ejecutado con éxito");
});

app.get("/whoami", (req, res) => {
  res.send("Hola, soy API 2");
});

// Start the server
app.listen(3000, () => {
  console.log("API 2 running on port 3000");
});
