import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    avata: String,
    cloudinary_id: String,
    storeVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "videos" }],
    phone: { type: String },
    isAdmin: { type: Boolean }
},
    {
        timestamps: true,
    },
)

export const UserModel = mongoose.model('users', User)