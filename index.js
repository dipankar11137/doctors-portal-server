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
        const bookingCollection = client.db('doctors_portal').collection('bookings');

        // all services
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        /**
            * API Naming Convention
            * app.get('/booking') // get all bookings in this collection. or get more than one or by filter
            * app.get('/booking/:id') // get a specific booking 
            * app.post('/booking') // add a new booking
            * app.patch('/booking/:id) //
            * app.put('/booking/:id') // upsert ==> update (if exists) or insert (if doesn't exist)
            * app.delete('/booking/:id) //
           */
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const quire = { treatment: booking.treatment, date: booking.date, patient: booking.patient }
            const result = bookingCollection.insertOne(booking);
            res.send(result);
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