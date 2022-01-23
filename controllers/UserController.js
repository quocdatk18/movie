import { UserModel } from "../models/UserModel.js";
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from "../until.js";
import cloudinary from "../config/cloudinary.js";
import { VideoModel } from "../models/VideoModel.js";


export const getUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.find()

    res.json({ user })
})

export const login = expressAsyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password })
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        } else {
            res.status(401).json({
                messager: "invalid email or password "

            })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error !" })
    }


})
export const register = expressAsyncHandler(async (req, res) => {
    const user = new UserModel({
        // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,

    })
    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ message: "Email đã tồn tại" })
    user.save();
    res.json({
        success: true,
        token: generateToken(user),
        message: "Register successfully !",
        user
    });
})
export const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id)
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
    });

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description =
                req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
            user.password = req.body.password
        }
        user.avata = result.secure_url;
        user.cloudinary_id = result.public_id;
        user.address = req.body.address;
        user.phone = req.body.phone;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: user.isSeller,
            avata: updatedUser.avata,
            cloudinary: updatedUser.cloudinary_id,
            token: generateToken(updatedUser),
        });
    }
})
export const myVideos = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id).populate('storeVideos')
    const myVideos = user.storeVideos
    res.json(myVideos)

})

export const saveVideo = expressAsyncHandler(async (req, res) => {
    const checkUser = await UserModel.findById(req.user._id)
    if (checkUser.storeVideos.includes(req.body._id)) {
        return res.status(400).json({ msg: "Ban da luu video nay " });
    } else {
        const user = await UserModel.findByIdAndUpdate(req.user._id, {
            $push: {
                storeVideos: req.body._id
            }
        }, { new: true })
        return res.json({ user, msg: 'đã thêm vào tủ phim của bạn' });
    }

})

export const unsaveVideo = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: {
            storeVideos: req.body._id
        }
    }, { new: true })
    return res.json(user);
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({ _id: req.params.id })

    if (user) {
        const removecmt = VideoModel.updateMany({ _id: req.params.id }, {
            $pull: {
                comments: req.params.id
            }
        })

        await user.remove()
        res.json({ removecmt, message: 'user deleted' })
    } else {
        res.json({ message: 'user not exists' })
    }
})

export const checkUser = async (req, res) => {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) return res.status(403).json({ success: false, message: "Unauthrazition !" })
    const token = generateToken(user);
    return res.status(200).json({ success: true, user: { ...user._doc, token }, message: "Authen success" })

}