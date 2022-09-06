//user: rashel68, pass : 6CWKaaG9Gx3NTLX8
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://rashel68:3eRv5wWaAMT56nTf@cluster0.lzu73.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("applicationDB");
        // const userCollection = database.collection("userCollection");
        const applicantCollection = database.collection("applicantCollection");

        //GET API
        app.get('/applicantCollection', async (req, res) => {
            const cursor = applicantCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });



        //POST API
        app.post('/applicantCollection', async (req, res) => {
            const newUser = req.body;
            const result = await applicantCollection.insertOne(newUser);

            console.log('got new user', req.body);
            console.log('added user', result);
            res.json(result);

        });

        //update user
        app.get('/applicantCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await applicantCollection.findOne(query);
            res.json(result);
        })

        //DELETE API
        app.delete('/applicantCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await applicantCollection.deleteOne(query);
            console.log('Deleting id', id);
            res.json(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Yeah ! My server is running . . . ');
});

app.listen(port, () => {
    console.log('Server running on port', port);
})