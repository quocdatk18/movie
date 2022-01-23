import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const replieCommentVideo = new Schema({
    content: { type: String },
    isAdmin: Boolean,
    nameUser: { type: String },
    avata: { type: String },
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const commentVideo = new Schema({
    author: { type: String },
    status: String,
    isAdmin: Boolean,
    avata: { type: String },
    content: { type: String },
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replies: [replieCommentVideo]
}, {
    timestamps: true
})

const listVideo = new Schema({
    name: { type: String, require: true },
    video: { type: String, require: true },
    nameFirm: { type: String, require: true },
    id: { type: Object, required: true },
    chapter: { type: String }


})
const Video = new Schema({

    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    views: { type: Number, required: false },
    status: { type: String, required: false },
    cloudinary_id: { type: String },
    description: { type: String, required: true },
    list: [listVideo],
    comments: [commentVideo],

},
    {
        timestamps: true
    }
)
export const VideoModel = mongoose.model('videos', Video)
