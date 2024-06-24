import { verify } from 'crypto';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please tell us your name!'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyTokenExpires: Date,

});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;