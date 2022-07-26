import mongoose from 'mongoose';
import ICompanySettings from '../interfaces/ICompanySettings';

const companySettingsSchema = new mongoose.Schema<ICompanySettings>({
    pricingPlan: {
        type: Number,
        required: true,
        default: 1
    },

    administratorsEmails: {
        type: [String]
    },

    //For user contracts
    startingHourlyWage: {
        type: Number
    },
    settlementMethod: {
        type: Number //daily/weekly/monthly overitme calculating
    },
    overtimeAllowance: {
        type: Number
    }, //% 0-1
    freeDaysAllowance: {
        type: Number
    }, //% 0-1

    //For orders
    hoursPerDayCount: {
        type: Number
    },
    breakTime: {
        type: Number
    }
});

const CompanySettings = mongoose.model<ICompanySettings>("companySettings", companySettingsSchema);


export default CompanySettings;
