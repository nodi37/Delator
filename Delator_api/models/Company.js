const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    orgNumber: {
        type: Number,
        //required: true,
        //unique: true
    },
    administrators: {
        type: Array
    },
    defHourlyRate: {
        type: Number
    },
    defTotalBreakTime: {
        type: Number
    },
    settlementMethod: {
        type: Number
    },
    stdHrsPerDay: {
        type: Number
    },
    overtimeAllowance: {
        type: Number
    }, //% 0-1
    freeDaysAllowance: {
        type: Number
    }, //% 0-1
    pricingPlan: {
        type: Number
    },
    logo: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const Company = mongoose.model("Company", companySchema);

//////////////////////
//Define here search paths for filters

Company.filtersDef = {
    administrators: 'administrators.id',
    keywordStringType: [
        'name',
        'description',
        'administrators'
    ],
    keywordNumberType: [
        'orgNumber'
    ]
}

module.exports = Company;
