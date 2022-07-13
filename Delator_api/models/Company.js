const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = Schema({

    pricingPlan: {
        type: Number
    },
    employessCount:{
        type: Number //from API
    },
    registeredEmployessCount:{
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
        type: Array
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

const Company = mongoose.model("Company", companySchema);

//////////////////////
//Define here search paths for filters

Company.filtersDef = {
    //administrators: 'administrators.id',
    keywordStringType: [
        'companyName',
        'companyDescription',
        //'administratorsIds'
    ],
    keywordNumberType: [
        'orgNumber'
    ]
}

module.exports = Company;
