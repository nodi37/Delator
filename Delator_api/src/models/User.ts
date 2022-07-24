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

    createDate: {
        type: Date,
        default: Date.now()
    }
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
