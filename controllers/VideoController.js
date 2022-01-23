import expressAsyncHandler from 'express-async-handler';
import cloudinary from "../config/cloudinary.js";
import { UserModel } from "../models/UserModel.js";
import { VideoModel } from "../models/VideoModel.js";





export const getAllVideo = expressAsyncHandler(async (req, res) => {

    const video = await VideoModel.find()
    const videoMost = await VideoModel.find().sort("-views").limit(5);
    const videoNew = await VideoModel.find().sort("-updatedAt").limit(8);


    res.json({ video, videoMost, videoNew })
})
export const updateViews = expressAsyncHandler(async (req, res) => {

    const video = await VideoModel.findById(req.params.id)
    if (video) {
        video.views = video.views + 1 || 1
    }
    const updateVideo = await video.save()

    res.json(video)

})


export const findVideoById = expressAsyncHandler(async (req, res) => {
    const video = await VideoModel.findById(req.params.id)
    if (video) {
        const videoss = video.comments.find(item => item._id == null)
        console.log(videoss)

        res.json(video)
    } else {
        res.json({ message: 'video not found' })
    }
})

export const findVideoListById = expressAsyncHandler(async (req, res) => {
    const video = await VideoModel.findById(req.params.id)
    if (video) {
        const videoChaper = video.list.find(item => item.chapter == req.params.chapter)
        res.json(videoChaper)
    } else {
        res.json({ message: 'video not found' })
    }
})
export const filterVideoByType = expressAsyncHandler(async (req, res) => {
    if (req.params.type === "Tất cả") {
        const videoMost = await VideoModel.find().sort("-views").limit(10);
        res.json(videoMost)
    } else {
        const filterVideoByType = await VideoModel.find({ type: req.params.type })
        res.json(filterVideoByType)
    }
})
export const SearchVideo = expressAsyncHandler(async (req, res) => {
    const name = req.query.name
    const video = await VideoModel.find({ name: { $regex: name, $options: '$i' } }).limit(5)

    video.length > 0 ? res.json(video) : res.json({ message: ' khong tim thay video' })
})
export const CommentVideo = expressAsyncHandler(async (req, res) => {
    const video = await VideoModel.findById(req.params.id)
    if (video) {

        video.comments.push(req.body)
        const updateCommentVideo = await video.save()
        // console.log(updateCommentVideo)

        res.json(updateCommentVideo)
    } else {
        res.status(400).json({ message: 'video not found' })
    }

})

export const RepCommentVideo = expressAsyncHandler(async (req, res) => {


    const video = await VideoModel.findById(req.params.id)
    if (video) {
        const indexComment = video.comments.findIndex(item => item._id == req.body.idComment)
        video.comments[indexComment].replies.push(req.body)

        await video.save()
        res.json(video)
    } else {
        res.status(400).json({ message: 'video not found' })
    }

})
export const deleteCommentVideo = expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const video = await VideoModel.findByIdAndUpdate(req.body._id, {

        $pull: {
            comments: { _id: req.body.item._id }
        }

    }, { new: true })
    // console.log(video)
    return res.json(video)

})
export const deleteCommentVideoAdmin = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const video = await VideoModel.findByIdAndUpdate(req.body._id, {

        $pull: {
            comments: { _id: req.body.item._id }
        }

    }, { new: true })
    // console.log(video)
    return res.json(video)

})
export const deleteRepCommentVideo = expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const video = await VideoModel.findByIdAndUpdate(req.body.video_id)
    const comments = video.comments
    // console.log(comments)
    if (comments) {
        const comment = comments.find(item => item._id == req.body.idComment)
        if (comment) {
            const commentRep = comment.replies.find(item => item._id == req.body.item._id)
            await commentRep.remove()
        }
    }
    const newVideo = await video.save()
    console.log(newVideo)
    return res.json(newVideo)


})

export const paginationVideo = expressAsyncHandler(async (req, res) => {
    var perPage = 4
    var page = req.params.page || 1
    VideoModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, videos) {
            VideoModel.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                res.json({
                    videos: videos,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})
export const AddVideo = expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
    });


    const video = new VideoModel({
        name: req.body.name,
        type: req.body.type,
        image: result.secure_url,
        cloudinary_id: result.public_id,
        description: req.body.description

    });
    const newVideo = await video.save();

    if (newVideo) {
        return res
            .status(201)
            .json({ message: "New video Created", data: newVideo });
    } else {
        res.json("error add video");
    }
});
export const AddChapterVideo = expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const video = await VideoModel.findById(req.params.id);
    video.list.unshift(req.body)
    const updateChapter = await video.save()
    // console.log(updateChapter)

    res.json(updateChapter)



})
export const updateVideo = expressAsyncHandler(async (req, res) => {
    console.log("update: ", req.body);
    const video = await VideoModel.findById(req.body._id);
    // console.log(video)
    await cloudinary.uploader.destroy(video.cloudinary_id);

    let result;
    if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result);
    }

    if (video) {
        video.name = req.body.name || video.name;
        video.type = req.body.type || video.type;
        video.description = req.body.description || video.description;
        video.image = result?.secure_url || video.image;
        video.cloulinary_id = result?.public_id || video.cloudinary_id;


        const updateVideo = await video.save();
        // console.log(updateVideo)
        if (updateVideo) {
            res.json("update success");
        } else {
            res.json("update fail");
        }
    }


});

export const DeleteVideo = expressAsyncHandler(async (req, res) => {
    const deleteVideo = await VideoModel.findById(req.params.id)
    // console.log(deleteVideo)

    await cloudinary.uploader.destroy(deleteVideo.cloudinary_id);

    if (deleteVideo) {
        await deleteVideo.remove()
        console.log('delete')
        res.json({ message: 'video deleted' })
    } else {
        console.log('error delete video')
        res.json('error in deletetion')
    }
})
export const Deletechapter = expressAsyncHandler(async (req, res) => {
    // console.log(req.body.id)
    const videoId = await VideoModel.findById(req.params.id)
    console.log(videoId)
    const chapter = videoId.list.find(item => item.id == req.body.id)
    // console.log(chapter)
    if (chapter) {
        await chapter.remove()
    }
    const updateChapter = await videoId.save()
    // console.log(updateChapter)
    res.json(updateChapter)
    //    deleteVideo.list.find(item=>item._id==req.body.id)
})
export const UpdateChapterVideo = expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const videoId = await VideoModel.findById(req.params.id);
    const videochapter = videoId.list.find(item => item.id == req.body.id)

    console.log(videochapter)
    if (videochapter) {
        videochapter.name = req.body.name || videochapter.name
        videochapter.video = req.body.video || videochapter.video
    }
    const updateChapter = await videoId.save()
    // console.log(updateChapter)

    res.json(updateChapter)



})