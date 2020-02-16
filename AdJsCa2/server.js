const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const episodesRouter = require('./routes/episodes');
const charactersRouter = require('./routes/characters');
const authRouter = require('./routes/auth');
const path = require('path');

const app = express();

app.use(body_parser.json());
app.use(cors());
app.use('/episodes', episodesRouter);
app.use('/characters', charactersRouter);
app.use('/account', authRouter);

const uri = process.env.ATLAS_URI;

mongoose.connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true //optional
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
    res.json({message: "You are in the route route"});
})

const port = process.env.PORT || 4000;

//////////Heroku////////////
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server listening ${port}`);
});
