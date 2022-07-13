const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const companyOrderSchema = new Schema({
    companyId: {
        type: String,
        required: true,
    },


    customerData: {
        type: String
    },
    fromDate: {
        type: Date
    },

    toDate: {
        type: Date
    },

    archival: {
        type: Boolean
    },


    workPlace: {
        type: String
    },
    workTime: {
        type: Number
    },
    brakeTime: {
        type: Number
    },
    hourlyWage: {
        type: Number
    },


    files: {
        type: Array
    },
    createDate: {
        type: Date,
        default: Date.now(),
        required: true
    }
});





const CompanyOrder = mongoose.model("companyOrder", companyOrderSchema);



//////////////////////
//Define here search paths for filters

// User.filtersDef = {
//     //employeeOf: 'employeeOf.companyId',
//     keywordStringType: [
//         'name',
//         'lastName',
//         'email'
//     ],
//     keywordNumberType: [
//         'phoneNumber'
//     ]
// }

module.exports = CompanyOrder;
