import mongoose from 'mongoose';
import IEmploymentContract from '../interfaces/IEmploymentContract';

const employmentContractSchema = new mongoose.Schema<IEmploymentContract>({
    userEmail: {
        type: String,
        required: true
    },
    userId: {
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
    },
//
    // contractType: {
    //     type: String
    // },
    // employmentDimension: {
    //     type: Number
    // },

    hourlyWage: {
        type: Number
    },

    // contractHours: {
    //     type: Number
    // }, Add more things

    // contractBreak: {
    //     type: Number
    // },

    fromDate: {
        type: Date
    },

    toDate: {
        type: Date
    },

    permamentContract: {
        type: Boolean
    },

    archival: {
        type: Boolean,
        default: false
    },


    // signDate: {
    //     type: Date
    // }
});

const EmploymentContract = mongoose.model<IEmploymentContract>("employmentContract", employmentContractSchema);

export default EmploymentContract;
