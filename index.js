const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Selecionar a coleção "response"
    const database = client.db('heroes');
    const collectionName = 'response';
    const collection = database.collection(collectionName);

    // Exibir documentos na coleção "response"
    const documents = await collection.find({}).toArray();
    console.log(`Documentos na coleção ${collectionName}:`);
    documents.forEach((document) => {
      console.log(document);
    });

    await client.close();
    console.log('Conexão com o MongoDB encerrada');

    return documents;
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
    throw error;
  }
}

// Chame a função connect para obter os documentos da coleção "response"
connect()
  .then((documents) => {
    // Rota para retornar os documentos como resposta JSON
    app.get('/', (req, res) => {
      res.json(documents);
    });

    // Inicia o servidor na porta desejada
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o MongoDB', error);
  });