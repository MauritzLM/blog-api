const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});

