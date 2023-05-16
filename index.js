const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');
    await client.close();
    console.log('Conexão com o MongoDB encerrada');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

connect()
  .then(() => {
    // Rota para a raiz ("/") da aplicação
    app.get('/', (req, res) => {
      res.send('Servidor online!');
    });

    app.get('/heroes', async (req, res) => {
      try {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();

        const heroesCollection = client.db('overwatch').collection('heroes');
        const heroesDocuments = await heroesCollection.find({}).toArray();

        console.log('Documentos na coleção heroes:');
        heroesDocuments.forEach((document) => {
          console.log(document);
        });

        await client.close();

        res.json(heroesDocuments);
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o MongoDB', error);
  });

setInterval(async () => {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const heroesCollection = client.db('overwatch').collection('heroes');
    const updatedHeroesDocuments = await heroesCollection.find({}).toArray();

    console.log('Documentos atualizados na coleção heroes:', updatedHeroesDocuments);

    await client.close();
  } catch (error) {
    console.error('Erro ao verificar o banco de dados', error);
  }
}, 5000); // Verificar a cada 5 segundos