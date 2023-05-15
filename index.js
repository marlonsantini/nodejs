const { MongoClient } = require('mongodb');

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

connect();