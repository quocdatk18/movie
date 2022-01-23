import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: 'dat11',
    api_key: '412473778452846',
    api_secret: 'xRz_fof_f0IKOo9JZLzQyCwUX2M'
});

export default cloudinary