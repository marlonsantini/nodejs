const { MongoClient } = require('mongodb');
const express = require('express');
const path = require('path');
const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Listar as coleções do banco de dados
    const database = client.db('heroes');
    const collections = await database.listCollections().toArray();
    console.log('Coleções do banco de dados:');
    collections.forEach((collection) => {
      console.log(collection.name);
    });

    // Exibir documentos em uma coleção específica
    const collectionName = 'nomeDaColecao';
    const collection = database.collection(collectionName);
    const documents = await collection.find({}).toArray();
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

connect();

app.get('/', (req, res) => {
  // Exemplo de dados a serem exibidos
  const data = { name: 'John', age: 30 };

  // Renderiza um arquivo de template (por exemplo, index.ejs) e passa os dados para ele
  res.render('index', { data });
});

// Define a pasta que contém os arquivos de template (por exemplo, views/)
app.set('views', path.join(__dirname, 'views'));

// Define o mecanismo de renderização de template (por exemplo, usando EJS)
app.set('view engine', 'ejs');

// Inicia o servidor na porta desejada
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});