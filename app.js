const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const multer = require('multer');

// configure cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes
const routes = require('./routes/routes');

app.use('/', routes);


app.listen(3001, () => {
    console.log('listening on port 3001')
});

