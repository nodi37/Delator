const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();
const cors = require('cors');

//Configs
const corsConfig = require('./config/corsConfig');

//Helpers
const { initApp } = require('./helpers/appInitializer');

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
    initApp();
    console.log(`Api works on port ${port}`)
});