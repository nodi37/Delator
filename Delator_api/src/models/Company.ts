import mongoose from 'mongoose';
import ICompany from '../interfaces/ICompany';

const companySchema = new mongoose.Schema<ICompany>({

    pricingPlan: {
        type: Number
    },
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
    administratorsIds: {
        type: [String]
    },
    logo: {
        type: String
    },

    //For user contracts
    startingHourlyWage: {
        type: Number
    },
    settlementMethod: {
        type: Number //daily/weekly/monthly overitme calculating
    },
    overtimeAllowance: {
        type: Number
    }, //% 0-1
    freeDaysAllowance: {
        type: Number
    }, //% 0-1


    //For orders
    hoursPerDayCount: {
        type: Number
    },
    breakTime: {
        type: Number
    }
});

const Company = mongoose.model<ICompany>("Company", companySchema);


export default Company;
