const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';
let documents = [];

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Selecionar a coleção "support"
    const database = client.db('overwatch');
    const collectionName = 'support';
    const collection = database.collection(collectionName);

    // Exibir documentos na coleção "support"
    documents = await collection.find({}).toArray();
    console.log(`Documentos na coleção ${collectionName}:`);
    documents.forEach((document) => {
      console.log(document);
    });

    await client.close();
    console.log('Conexão com o MongoDB encerrada');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

// Chame a função connect para obter os documentos da coleção "support"
connect()
  .then(() => {
    // Resto do seu código...

    // Rota para retornar os documentos como resposta JSON
    app.get('/support', (req, res) => {
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

// Lógica para verificar o banco de dados em intervalos de tempo
setInterval(async () => {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('heroes');
    const collection = database.collection('response');
    const updatedDocuments = await collection.find({}).toArray();
    console.log('Banco de dados atualizado:', updatedDocuments);
    documents = updatedDocuments;
    await client.close();
  } catch (error) {
    console.error('Erro ao verificar o banco de dados', error);
  }
}, 5000); // Verificar a cada 5 segundos