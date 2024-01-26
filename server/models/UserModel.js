import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email:{ type: String, unique: true, require: true},
    password:{ type: String, require: true},
    genras:[
        { type: String, require: true},
    ],
}, {timestamps: true,})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel