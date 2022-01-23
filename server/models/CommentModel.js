import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const replieCommentVideo = new Schema({
    content: { type: String },
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, {
    timestamps: true
})

const commentVideo = new Schema({
    content: { type: String, required: true },
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    byVideoId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'videos' }],
    replies: [replieCommentVideo]
}, {
    timestamps: true
})

export const CommentModel = mongoose.model('comments', commentVideo)
