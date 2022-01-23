import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';



export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log(req.headers.authorization)
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer
        jwt.verify(
            token,
            process.env.TOKEN_SECRET || "somethingsecret",
            (err, decode) => {
                if (err) {
                    res.status(404).json({ message: "invalid token" });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).json({ message: "no token" });
    }
};
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid Admin Token' });
    }
};
export const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});