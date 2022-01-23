import express from 'express'
import { AddChapterVideo, AddVideo, CommentVideo, Deletechapter, deleteCommentVideo, deleteCommentVideoAdmin, deleteRepCommentVideo, DeleteVideo, filterVideoByType, findVideoById, findVideoListById, getAllVideo, paginationVideo, RepCommentVideo, SearchVideo, UpdateChapterVideo, updateVideo, updateViews } from '../controllers/VideoController.js'
import { isAdmin, isAuth, upload } from '../until.js'

const VideoRouter = express.Router()

VideoRouter.get('/detail/:id', findVideoById)
VideoRouter.get('/videoId/:id/:chapter', findVideoListById)
VideoRouter.get('/:type', filterVideoByType)
VideoRouter.get('/', getAllVideo)
VideoRouter.get(`/pagination/:page`, paginationVideo);
VideoRouter.post(
    "/create",
    isAuth,
    isAdmin,
    upload.single("image"),
    AddVideo
);
VideoRouter.put(
    "/update",
    isAuth,
    isAdmin,
    upload.single("image"),
    updateVideo
);
VideoRouter.post(
    "/addchapter/:id",
    isAuth,
    isAdmin,
    upload.single("image"),
    AddChapterVideo
);
VideoRouter.put(
    "/updatechapter/:id",
    isAuth,
    isAdmin,
    upload.single("image"),
    UpdateChapterVideo
);
VideoRouter.delete(
    "/delete/:id",
    isAuth,
    isAdmin,
    upload.single("image"),
    DeleteVideo
);
VideoRouter.patch(
    "/deleteChapter/:id",
    isAuth, isAdmin,
    Deletechapter
);
VideoRouter.put('/updateview/video/:id', updateViews)
VideoRouter.get('/search/video', SearchVideo)
VideoRouter.post("/comment/:id", isAuth, CommentVideo);
VideoRouter.post("/rep/comment/:id", isAuth, RepCommentVideo);
VideoRouter.patch("/deletecmt", isAuth, deleteCommentVideo)
VideoRouter.patch("/deletecmtAdmin", isAuth, isAdmin, deleteCommentVideoAdmin)

VideoRouter.patch("/deleterepcmt", isAuth, deleteRepCommentVideo)









export default VideoRouter;