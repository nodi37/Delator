const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const employmentContractSchema = new Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
        ///////// TO DELETE AFTER ADDING AUTH
        default: 'XXDDD'
        /////////
    },


    hourlyWage: {
        type: Number
    },
    contractType: {
        type: String
    },
    employmentDimension: {
        type: Number
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

    files: {
        type: Array
    },

    signDate: {
        type: Date
    },
    lastChangeDate: {
        type: Date
    }
});





const EmploymentContract = mongoose.model("employmentContract", employmentContractSchema);



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

module.exports = EmploymentContract;
