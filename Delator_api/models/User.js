const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number
    },
    photo: {
        type: String
    },

    userType: {
        type: String,
        required: true,
        default: 'user'
    },

    language: {
        type: String,
        default: 'no'
    },

    password: {
        type: String,
        default: 'xxxxxxx',
        required: true
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
    //employeeOf: 'employeeOf.companyId',
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
