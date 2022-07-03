const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoursSubDoc = new Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    hoursCalculated: {
        type: Number,
        required: true
    }
});

const othersSubDoc = new Schema({
    value: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    photo: {
        type: String
    }
});


const raportSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    raportDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    hours: [hoursSubDoc],
    additional: [othersSubDoc],
    hoursCount: {
        type: Number
    },
    hourWage: {
        type: Number
    },
    additionalValue: {
        type: Number
    },
    totalToPay: {
        type: Number
    },
    closed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Raport = mongoose.model("Raport", raportSchema);


//////////////////////
//Define here search paths for filters

Raport.filtersDef = {
    //Filters definition here
    keywordStringType: [
        'additional'
    ],
    // keywordNumberType: [
    //     'phoneNumber'
    // ]
}



module.exports = Raport
