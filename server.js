const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const HealthRouter = require('./routes/health');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
    origin: ['http://localhost:3000','https://sinhsportal.vercel.app'],
    optionsSuccessStatus: 200 
  }
// middleware
app.use(cors(corsOptions));
app.use(express.json());


// mogodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection is established.");
});

app.use('/health', HealthRouter);


app.listen(port, ()=> {
    console.log(`Server is running in port : ${port}`);
})
