import express from 'express';
import { checkUser, DeleteUser, getUser, login, myVideos, register, saveVideo, unsaveVideo, updateUser } from '../controllers/UserController.js';
import { isAuth, upload } from '../until.js';


const UserRouter = express.Router()
UserRouter.post('/login', login)
UserRouter.put('/update', isAuth, upload.single("image"), updateUser)
UserRouter.post('/register', register)
UserRouter.get('/', getUser)
UserRouter.get('/myvideo', isAuth, myVideos)
UserRouter.get("/load-user", isAuth, checkUser)
UserRouter.patch("/saveVideo/", isAuth, saveVideo)
UserRouter.patch("/unsaveVideo/", isAuth, unsaveVideo)
UserRouter.delete('/delete/:id', DeleteUser)





export default UserRouter;