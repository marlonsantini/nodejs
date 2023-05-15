const { MongoClient } = require('mongodb');

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Listar as coleções do banco de dados
    const database = client.db();
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