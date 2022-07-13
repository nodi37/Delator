const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const employeeAssignmentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
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


    hourlyWage: {
        type: Number
    },
    contractedHours: {
        type: Number
    },
    brakeTime: {
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





const EmployeeAssignment = mongoose.model("employeeAssigment", employeeAssignmentSchema);



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

module.exports = EmployeeAssignment;
