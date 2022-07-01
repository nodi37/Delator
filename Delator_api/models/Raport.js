const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const raportSchema = Schema({
    userId: {
        type: String,
        required: true,
    },
    raportDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    hours: {
        type: Array
    },
    additional: {
        type: Array
    },
    hoursCount:{
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
    accepted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Raport = mongoose.model("Raport", raportSchema);
module.exports = Raport 


// raport = {
//     user_id: number,
//     raport_id: number,
//     date: date,
//     hours: [
//         {
//             from: date/time, 
//             to: date/time, 
//             hoursCalculated: number //Rodzielić dni przy nockach
//         },
//         {
//             from: date/time, 
//             to: date/time, 
//             hoursCalculated: number
//         }
//     ],
//     additional: [
//         {
//             value: number, 
//             name: string,
//             description: string,
//             photo: Base64 - string
//         },
//         {
//             value: number, 
//             name: string,
//             description: string,
//             photo: Base64 - string
//         }
//     ]
//     hoursCount: number,
//     hourWage: number,
//     additionalValue: number,
//     total: number
// }