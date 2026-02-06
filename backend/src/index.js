const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes simples pour commencer
app.get('/api/health', function(req, res){
  res.json({ status: 'OK', message: 'Backend running' });
});

app.post('/api/test', function(req, res){
  res.json({ received: req.body });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
  console.log(`Backend running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/auth/register', function(req, res){
    /* 
    Ici je dois vérifier puis enregistrer les données de l'utilisateur qui vient de créer son compte. 
    Je devrais peut-être créer un fichier à part pour gérer le cas des utilisateurs.
    */
})
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
