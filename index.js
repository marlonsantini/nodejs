const { MongoClient } = require('mongodb');

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Resto do código...

    await client.close();
    console.log('Conexão com o MongoDB encerrada');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

connect();