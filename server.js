// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678', // ton mot de passe MySQL
  database: 'vente2023' // ton nom de base
});

db.connect((err) => {
  if (err) {
    console.error('Erreur connexion MySQL:', err);
    return;
  }
  console.log('Connecté à MySQL ✅');
});

// Route pour ajouter un client
app.post('/api/clients', (req, res) => {
  const { nom, email } = req.body;
  
  if (!nom || !email) {
    return res.status(400).json({ message: 'Nom et Email requis' });
  }

  const sql = 'INSERT INTO clients (nom_client, email) VALUES (?, ?)';
  db.query(sql, [nom, email], (err, result) => {
    if (err) {
      console.error('Erreur ajout client:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Client ajouté avec succès', clientId: result.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur Node.js lancé sur http://localhost:${PORT}`);
});

