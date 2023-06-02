const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const formidableMiddleware = require('express-formidable');
// const multer = require('multer');


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(formidableMiddleware());


// routes
const routes = require('./routes/routes');

app.use('/', routes);


app.listen(3001, () => {
    console.log('listening on port 3001')
});

