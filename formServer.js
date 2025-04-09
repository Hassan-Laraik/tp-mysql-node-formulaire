// formServer.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Vue moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Formulaire GET
app.get('/form', (req, res) => {
  res.render('form');
});
app.get('/test', (req, res) => {
  res.render('tester');
});

// Formulaire POST
app.post('/submit', async (req, res) => {
  const { nom, email } = req.body;

  try {
    const response = await axios.post('http://localhost:3000/api/clients', { nom, email });
    res.send('Client ajouté avec succès ! ✅');
  } catch (error) {
    console.error('Erreur envoi API:', error.message);
    res.status(500).send('Erreur lors de l\'ajout du client ❌');
  }
});

app.listen(PORT, () => {
  console.log(`Formulaire en ligne sur http://localhost:${PORT}`);
});

