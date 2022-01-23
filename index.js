import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js'
import VideoRouter from './routers/VideoRouter.js';
import UserRouter from './routers/UserRouter.js';
import cloudinary from './config/cloudinary.js'


const app = express()
dotenv.config();
connectDB();

const allowedOrigins = ['http://localhost:3000',
  'https://client-movie.netlify.app/'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/video', VideoRouter)
app.use('/user', UserRouter)
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
