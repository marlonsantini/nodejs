const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';
let supportDocuments = [];
let tankDocuments = [];
let damageDocuments = [];

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Selecionar a coleção "support"
    const supportDatabase = client.db('overwatch');
    const supportCollection = supportDatabase.collection('support');

    // Exibir documentos na coleção "support"
    supportDocuments = await supportCollection.find({}).toArray();
    console.log('Documentos na coleção support:');
    supportDocuments.forEach((document) => {
      console.log(document);
    });

    // Selecionar a coleção "tank"
    const tankDatabase = client.db('overwatch');
    const tankCollection = tankDatabase.collection('tank');

    // Exibir documentos na coleção "tank"
    tankDocuments = await tankCollection.find({}).toArray();
    console.log('Documentos na coleção tank:');
    tankDocuments.forEach((document) => {
      console.log(document);
    });

    // Selecionar a coleção "damage"
    const damageDatabase = client.db('overwatch');
    const damageCollection = damageDatabase.collection('damage');

    // Exibir documentos na coleção "damage"
    damageDocuments = await damageCollection.find({}).toArray();
    console.log('Documentos na coleção damage:');
    damageDocuments.forEach((document) => {
      console.log(document);
    });

    await client.close();
    console.log('Conexão com o MongoDB encerrada');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB', error);
  }
}

// Chame a função connect para obter os documentos das coleções
connect()
  .then(() => {
    // Rota para retornar os documentos da coleção "support" como resposta JSON
    app.get('/support', (req, res) => {
      res.json(supportDocuments);
    });

    // Rota para retornar os documentos da coleção "tank" como resposta JSON
    app.get('/tank', (req, res) => {
      res.json(tankDocuments);
    });

    // Rota para retornar os documentos da coleção "damage" como resposta JSON
    app.get('/damage', (req, res) => {
      res.json(damageDocuments);
    });

    // Rota para combinar heróis de diferentes papéis
    app.get('/heroes', (req, res) => {
      // Combine os documentos das coleções em um único objeto
      const combinedHeroes = {
        support: supportDocuments,
        tank: tankDocuments,
        damage: damageDocuments
      };

      // Envie a resposta como JSON
      res.json(combinedHeroes);
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

    // Atualizar documentos da coleção "support"
    const supportDatabase = client.db('overwatch');
    const supportCollection = supportDatabase.collection('support');
    const updatedSupportDocuments = await supportCollection.find({}).toArray();
    console.log('Documentos atualizados na coleção support:', updatedSupportDocuments);
    supportDocuments = updatedSupportDocuments;

    // Atualizar documentos da coleção "tank"
    const tankDatabase = client.db('overwatch');
    const tankCollection = tankDatabase.collection('tank');
    const updatedTankDocuments = await tankCollection.find({}).toArray();
    console.log('Documentos atualizados na coleção tank:', updatedTankDocuments);
    tankDocuments = updatedTankDocuments;

    // Atualizar documentos da coleção "damage"
    const damageDatabase = client.db('overwatch');
    const damageCollection = damageDatabase.collection('damage');
    const updatedDamageDocuments = await damageCollection.find({}).toArray();
    console.log('Documentos atualizados na coleção damage:', updatedDamageDocuments);
    damageDocuments = updatedDamageDocuments;

    await client.close();
  } catch (error) {
    console.error('Erro ao verificar o banco de dados', error);
  }
}, 5000); // Verificar a cada 5 segundos