const { MongoClient } = require('mongodb');
const express = require('express');
const querystring = require('querystring');

const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';
const dbName = 'overwatch';
const collectionName = 'heroes';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Rota para buscar heróis com base em parâmetros
    app.get('/heroes', async (req, res) => {
      try {
        const heroesCollection = client.db(dbName).collection(collectionName);

        // Extrai os parâmetros da URL
        const queryParams = querystring.parse(req.url.split('?')[1]);
        const { _id } = queryParams;

        // Monta a consulta com base nos parâmetros fornecidos
        const query = {};

        if (_id) {
          query['_id'] = _id;
        }

        const heroesDocuments = await heroesCollection.find(query).toArray();

        console.log('Documentos na coleção heroes:');
        heroesDocuments.forEach((document) => {
          console.log(document);
        });

        // Verifica se há documentos retornados
        if (heroesDocuments.length > 0) {
          res.json(heroesDocuments);
        } else {
          res.status(404).json({ error: 'Nenhum herói encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

    // Verificar a cada 5 segundos
    setInterval(async () => {
      try {
        const heroesCollection = client.db(dbName).collection(collectionName);
        const updatedHeroesDocuments = await heroesCollection.find({}).toArray();

        console.log('Documentos atualizados na coleção heroes:', updatedHeroesDocuments);
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
      }
    }, 5000);
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

connect();