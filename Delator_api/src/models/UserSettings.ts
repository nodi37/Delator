import mongoose from 'mongoose';
import IUserSettings from '../interfaces/IUserSettings';


const userSettingsSchema = new mongoose.Schema<IUserSettings>({
    superUser: {
        type: Boolean,
        required: true,
        default: false
    },

    language: {
        type: String,
        default: 'no'
    },

    password: {
        type: String,
        required: true
    }
});


const UserSettings = mongoose.model<IUserSettings>("UsersSettings", userSettingsSchema);

export default UserSettings;
