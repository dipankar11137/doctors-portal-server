const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');
const app = express()
const port = process.env.Port || 5000;

// middle Wire
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.blwbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services');

        // all services
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {

    }
}

run(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Doctor Uncle')
})

app.listen(port, () => {
    console.log(`Doctor App Listening on port  ${port}`)
})