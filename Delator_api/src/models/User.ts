import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
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
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
