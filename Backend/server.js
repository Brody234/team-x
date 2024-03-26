require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const url = process.env.DATABASE_URL;


mongoose.connect(url);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("connected to database"));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true, // Reflect the request origin, as defined by the 'origin' option
    exposedHeaders: ['Access-Control-Allow-Credentials'],
}));
app.use(express.json());



app.listen(port, () => console.log('server has started'));