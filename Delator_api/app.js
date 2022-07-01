const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose =  require("mongoose");
require('dotenv').config();
const cors = require('cors');

/////////////////////////////////////////////////////////////////////////
//////////////////////MONGOOSE CONNECTION////////////////////////////////
mongoose.connect('mongodb://localhost:27017/delator', (err) => {
    if (err) {
        console.log("Initial connection to MongoDB error!");
        console.log(err);
    } else {
        console.log("Connected to MongoDB!");
    }
});

mongoose.connection.on('error', err => {
    console.log("Connection with databse broken! Check database server!");
    console.log(err);
});
//////////////////////MONGOOSE CONNECTION////////////////////////////////
/////////////////////////////////////////////////////////////////////////


//Configs
const corsConfig = require('./config/corsConfig');


//Middlewares
const { handleJsonError } = require('./middlewares/JSONValidator');


app.set('trust proxy', true);
app.use(cors(corsConfig));
app.use(express.json());
app.use(handleJsonError);


//Routes

const userRoutes = require("./routes/user.routes");
app.use('/v1/user', userRoutes);


const companyRoutes = require('./routes/company.routes');
app.use('/v1/company', companyRoutes);



















app.listen(port, () => {
    console.log(`Api works on port ${port}`)
});