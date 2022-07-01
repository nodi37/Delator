const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    employeeOf:{
        type: Array
    },
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
    logo: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

//employeeOf:        
//          {
//             company_id: number,
//             hourlyRate: number,
//             defTotalBreakTime: number,
//             settlementMethod: number,
//             stdHrsPerDay: number,
//             overtimeAllowance: numer, //% 0-1
//             freeDaysAllowance: number //% 0-1
//             joinDate: now()
//         },