const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

//downgraded to node 2.12 to establish connection - firewall blocking?

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, function(err) {
    if (err) {console.log(err)}
});


const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established')
});

const seriesRouter = require('./routes/tvseries');
const usersRouter = require('./routes/users')

app.use('/series', seriesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
}); 