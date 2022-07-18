import mongoose from 'mongoose';
import ICompany from '../interfaces/ICompany';

const companySchema = new mongoose.Schema<ICompany>({

    employessCount: {
        type: Number //from API
    },
    registeredEmployessCount: {
        type: Number //Currently registered in App
    },
    createDate: {
        type: Date,
        default: Date.now()
    },

    orgNumber: {
        type: Number,
        //required: true,
        //unique: true
    },
    companyName: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String
    },
    logo: {
        type: String
    },

});

const Company = mongoose.model<ICompany>("Company", companySchema);


export default Company;
