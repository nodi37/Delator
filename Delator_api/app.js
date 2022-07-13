const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
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
const { emptyFieldsFilter } = require('./middlewares/EmptyValuesFilter');


app.set('trust proxy', true);
app.use(cors(corsConfig));
app.use(express.json({ limit: '30mb' }));
app.use(handleJsonError);
app.use(emptyFieldsFilter);


//Routes

const userRoutes = require("./routes/user.routes");
app.use('/v1/user', userRoutes);

const companyRoutes = require('./routes/company.routes');
app.use('/v1/company', companyRoutes);

const contractRoutes = require('./routes/contract.routes');
app.use('/v1/contract', contractRoutes);



const raportRoutes = require('./routes/raport.routes');
app.use('/v1/raport', raportRoutes);









app.listen(port, () => {
    console.log(`Api works on port ${port}`)
});