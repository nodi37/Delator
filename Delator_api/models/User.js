const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeOfSubDoc = new Schema({
    companyId: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    defTotalBreakTime: {
        type: Number,
        required: true
    },
    settlementMethod: {
        type: Number,
        required: true
    },
    stdHrsPerDay: {
        type: Number,
        required: true
    },
    overtimeAllowance: {
        type: Number,
        required: true
    },
    freeDaysAllowance: {
        type: Number,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    employeeOf: [employeeOfSubDoc],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    privligeLvl: {
        type: Number,
        required: true
    }, //% 0-1
    photo: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", userSchema);



//////////////////////
//Define here search paths for filters

User.filtersDef = {
    employeeOf: 'employeeOf.companyId',
    keywordStringType: [
        'name',
        'lastName',
        'email'
    ],
    keywordNumberType: [
        'phoneNumber'
    ]
}

module.exports = User;
