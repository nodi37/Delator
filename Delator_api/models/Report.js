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


const reportSchema = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },

    reportForDate: {
        type: Date,
        required: true
    },
    reportCreationDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    reportModificationDate: {
        type: Date,
    },


    hoursLists: [hoursSubDoc],
    othersList: [othersSubDoc],
    isHoliday: {
        type: Boolean
    },

    approvedByUser: {
        type: Boolean
    },
    approvedByLeader: {
        type: Boolean
    },
    approvalDate: {
        type: Date
    }

});

const report = mongoose.model("report", reportSchema);


//////////////////////
//Define here search paths for filters

report.filtersDef = {
    //Filters definition here
    keywordStringType: [
        'additional'
    ],
    // keywordNumberType: [
    //     'phoneNumber'
    // ]
}



module.exports = report;
