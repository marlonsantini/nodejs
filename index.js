const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const querystring = require('querystring');

const app = express();

// Middleware para tratar todas as requisições como JSON
app.use(express.json());

const uri = 'mongodb://mongo:QQLhNtw6ChtW5SOp07V4@containers-us-west-65.railway.app:6637';
const dbName = 'overwatch';
const collectionNameHeroes = 'heroes';
const collectionNameMaps = 'maps';
const collectionNamePatchs = 'patchs';
const collectionNameComboStrong = 'combostrong';

async function connect() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Rota para buscar heróis com base em parâmetros
    app.get('/heroes', async (req, res) => {
      try {
        const heroesCollection = client.db(dbName).collection(collectionNameHeroes);

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
        const heroesCollection = client.db(dbName).collection(collectionNameHeroes);

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

    // Rota para buscar mapas com base em parâmetros
    app.get('/maps', async (req, res) => {
      try {
        const mapsCollection = client.db(dbName).collection(collectionNameMaps);

        // Extrai os parâmetros da URL
        const { _id } = req.query;

        // Monta a consulta com base nos parâmetros fornecidos
        const query = {};

        if (_id) {
          query['_id'] = new ObjectId(_id);
        }

        const mapsDocuments = await mapsCollection.find(query).toArray();

        // Verifica se há documentos retornados
        if (mapsDocuments.length > 0) {
          res.json(mapsDocuments);
        } else {
          res.status(404).json({ error: 'Nenhum mapa encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    // Rota para buscar detalhes de um mapa específico
    app.get('/maps/:id', async (req, res) => {
      try {
        const mapsCollection = client.db(dbName).collection(collectionNameMaps);

        // Extrai o parâmetro de ID da URL
        const { id } = req.params;

        // Monta a consulta com base no ID fornecido
        const query = { _id: new ObjectId(id) };

        const mapDocument = await mapsCollection.findOne(query);

        // Verifica se o documento foi encontrado
        if (mapDocument) {
          res.json(mapDocument);
        } else {
          res.status(404).json({ error: 'Mapa não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    // Rota para buscar patchs com base em parâmetros
    app.get('/patchs', async (req, res) => {
      try {
        const patchsCollection = client.db(dbName).collection(collectionNamePatchs);

        // Extrai os parâmetros da URL
        const { _id } = req.query;

        // Monta a consulta com base nos parâmetros fornecidos
        const query = {};

        if (_id) {
          query['_id'] = new ObjectId(_id);
        }

        const patchsDocuments = await patchsCollection.find(query).toArray();

        // Verifica se há documentos retornados
        if (patchsDocuments.length > 0) {
          res.json(patchsDocuments);
        } else {
          res.status(404).json({ error: 'Nenhum patch encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    // Rota para buscar detalhes de um patch específico
    app.get('/patchs/:id', async (req, res) => {
      try {
        const patchsCollection = client.db(dbName).collection(collectionNamePatchs);

        // Extrai o parâmetro de ID da URL
        const { id } = req.params;

        // Monta a consulta com base no ID fornecido
        const query = { _id: new ObjectId(id) };

        const patchDocument = await patchsCollection.findOne(query);

        // Verifica se o documento foi encontrado
        if (patchDocument) {
          res.json(patchDocument);
        } else {
          res.status(404).json({ error: 'Patch não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    // Rota para buscar combos fortes com base em parâmetros
    app.get('/combostrong', async (req, res) => {
      try {
        const comboStrongCollection = client.db(dbName).collection(collectionNameComboStrong);

        // Extrai os parâmetros da URL
        const { _id } = req.query;

        // Monta a consulta com base nos parâmetros fornecidos
        const query = {};

        if (_id) {
          query['_id'] = new ObjectId(_id);
        }

        const comboStrongDocuments = await comboStrongCollection.find(query).toArray();

        // Verifica se há documentos retornados
        if (comboStrongDocuments.length > 0) {
          res.json(comboStrongDocuments);
        } else {
          res.status(404).json({ error: 'Nenhum combo forte encontrado' });
        }
      } catch (error) {
        console.error('Erro ao verificar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao verificar o banco de dados' });
      }
    });

    // Rota para buscar detalhes de um combo forte específico
    app.get('/combostrong/:id', async (req, res) => {
      try {
        const comboStrongCollection = client.db(dbName).collection(collectionNameComboStrong);

        // Extrai o parâmetro de ID da URL
        const { id } = req.params;

        // Monta a consulta com base no ID fornecido
        const query = { _id: new ObjectId(id) };

        const comboStrongDocument = await comboStrongCollection.findOne(query);

        // Verifica se o documento foi encontrado
        if (comboStrongDocument) {
          res.json(comboStrongDocument);
        } else {
          res.status(404).json({ error: 'Combo forte não encontrado' });
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
        const heroesCollection = client.db(dbName).collection(collectionNameHeroes);
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