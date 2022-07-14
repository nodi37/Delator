import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import initApp from './utils/app.init';

const app = express();
const port = process.env.PORT || 3001;


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
//const corsConfig from './config/corsConfig');
import corsConfig from './config/corsConfig';


//Middlewares
import handleJsonError from './middlewares/JSONValidator';
import emptyFieldsFilter from './middlewares/EmptyValuesFilter';


app.set('trust proxy', true);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsConfig));
app.use(express.json({ limit: '30mb' }));
app.use(handleJsonError);
app.use(emptyFieldsFilter);


//Routes

import userRoutes from "./routes/user.routes";
app.use('/v1/user', userRoutes);

import companyRoutes from './routes/company.routes';
app.use('/v1/company', companyRoutes);

import contractRoutes from './routes/contract.routes';
app.use('/v1/contract', contractRoutes);

import reportRoutes from './routes/report.routes';
app.use('/v1/report', reportRoutes);

import authRoutes from './routes/auth.routes';
app.use('/v1/auth', authRoutes);



initApp();

app.listen(port, () => {
    console.log(`Api works on port ${port}`)
});