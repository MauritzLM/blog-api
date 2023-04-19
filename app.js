const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

require('dotenv').config()
// Connect DB
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// routes
const routes = require('./routes/routes');

app.use('/', routes);


app.listen(3000, () => {
    console.log('listening on port 3000')
});

