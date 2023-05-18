const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const querystring = require('querystring');

const app = express();

// Middleware para tratar todas as requisições como JSON
app.use(express.json());

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
        const { _id } = req.query;

        // Monta a consulta com base nos parâmetros fornecidos
        const query = {};

        if (_id) {
          query['_id'] = new ObjectId(_id);
        }

        const heroesDocuments = await heroesCollection.find(query).toArray();

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

    // Rota para buscar detalhes de um herói específico
    app.get('/heroes/:id', async (req, res) => {
      try {
        const heroesCollection = client.db(dbName).collection(collectionName);

        // Extrai o parâmetro de ID da URL
        const { id } = req.params;

        // Monta a consulta com base no ID fornecido
        const query = { _id: new ObjectId(id) };

        const heroDocument = await heroesCollection.findOne(query);

        // Verifica se o documento foi encontrado
        if (heroDocument) {
          res.json(heroDocument);
        } else {
          res.status(404).json({ error: 'Herói não encontrado' });
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