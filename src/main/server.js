// src/main/server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const http = require('http'); // Pour créer le serveur HTTP
const { Server } = require('socket.io');
const { Client } = require('ssh2'); // Utilisation de ssh2 pour la connexion SSH

const app = express();
const port = 3001;

// Utiliser express.json() pour parser le JSON
app.use(express.json());
app.use(cors());

// Déterminer un chemin accessible en écriture pour la base de données
let userDataPath;
try {
  // Essayer de récupérer le chemin userData via Electron
  const electron = require('electron');
  userDataPath = electron.app.getPath('userData');
} catch (e) {
  // Sinon, utiliser le dossier courant
  userDataPath = process.cwd();
}
const dbPath = path.join(userDataPath, 'ssh-manager.db');

console.log(`Base de données stockée dans : ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur lors de l'ouverture de la base de données:", err.message);
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

db.serialize(() => {
  // Création de la table folders si elle n'existe pas
  db.run(
    "CREATE TABLE IF NOT EXISTS folders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT)",
    (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table folders:", err.message);
      }
    }
  );

  // Création de la table connections si elle n'existe pas (sans la réinitialiser à chaque lancement)
  db.run(
    `CREATE TABLE IF NOT EXISTS connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      host TEXT NOT NULL,
      port TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      folder_id INTEGER,
      FOREIGN KEY(folder_id) REFERENCES folders(id)
    )`,
    (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table connections:", err.message);
      }
    }
  );
  console.log('Database initialized');
});

// --- Endpoints REST ---

// Route par défaut
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur SSH Manager!');
});

// Get all folders
app.get('/folders', (req, res) => {
  db.all("SELECT * FROM folders", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint pour récupérer un dossier par son id
app.get('/folders/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM folders WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Folder not found' });
      return;
    }
    res.json(row);
  });
});

// Créer un nouveau folder
app.post('/folders', (req, res) => {
  const { name, color } = req.body;
  db.run("INSERT INTO folders (name, color) VALUES (?, ?)", [name, color], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, color });
  });
});

// Supprimer un folder
app.delete('/folders/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM folders WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Get all connections
app.get('/connections', (req, res) => {
  db.all("SELECT * FROM connections", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint pour récupérer une connexion par son id
app.get('/connections/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM connections WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Connection not found' });
      return;
    }
    res.json(row);
  });
});

// Créer une nouvelle connection
app.post('/connections', (req, res) => {
  console.log("Received POST /connections with body:", req.body);
  const { name, host, port, username, password } = req.body;
  // Forcer folder_id à être null si non défini
  const folder_id = typeof req.body.folder_id !== 'undefined' ? req.body.folder_id : null;
  db.run(
    "INSERT INTO connections (name, host, port, username, password, folder_id) VALUES (?, ?, ?, ?, ?, ?)",
    [name, host, port, username, password, folder_id],
    function (err) {
      if (err) {
        console.error("Error inserting connection:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, host, port, username, password, folder_id });
    }
  );
});

// Update a connection
app.put('/connections/:id', (req, res) => {
  const { id } = req.params;
  const { folder_id } = req.body;
  db.run("UPDATE connections SET folder_id = ? WHERE id = ?", [folder_id, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updated: this.changes });
  });
});

// Delete a connection
app.delete('/connections/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM connections WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// --- Ajout de la logique SSH2 avec Socket.io ---
// Créer le serveur HTTP à partir de l'application Express
const server = http.createServer(app);

// Initialiser Socket.io sur ce serveur
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Lorsqu'un client se connecte via Socket.io
io.on('connection', (socket) => {
  console.log('Client connecté via Socket.io');

  // Écouter l'événement "startSSH" qui contient les informations de connexion
  socket.on('startSSH', (connInfo) => {
    // connInfo doit contenir host, port, username, password
    const { host, port, username, password } = connInfo;
    const sshClient = new Client();

    sshClient.on('ready', () => {
      console.log('SSH Client :: ready');
      sshClient.shell((err, stream) => {
        if (err) {
          socket.emit('error', 'Erreur lors de l\'ouverture du shell SSH');
          return;
        }
        // Relayer les données du shell vers le client
        stream.on('data', (data) => {
          socket.emit('output', data.toString());
        });
        // Relayer les entrées du client vers le shell
        socket.on('input', (input) => {
          stream.write(input);
        });
        // Lorsque le shell se ferme, terminer la connexion SSH
        stream.on('close', () => {
          sshClient.end();
          socket.emit('output', '\n--- Session terminée ---\n');
        });
      });
    }).on('error', (err) => {
      console.error('SSH Client Error:', err);
      socket.emit('error', 'Erreur de connexion SSH');
    }).connect({
      host: host,
      port: port,
      username: String(username), // Conversion en chaîne de caractères pour autoriser les chiffres
      password: password  // Pour une meilleure sécurité, pensez à utiliser des clés privées
    });
  });
});

// Remplacer app.listen par server.listen pour que Socket.io fonctionne
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
