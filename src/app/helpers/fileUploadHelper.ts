import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'
import * as fs from 'fs'
import config from '../config';
import { ICloudinary, IFile } from '../interface/file';

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `tmp/`)
    },
    filename: function (req, file, cb) {
        console.log(`hello file`, file);
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
})

const uploadToCloudinary = async (file: IFile): Promise<ICloudinary | null> => {

    // console.log(`file from uploader`, file);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinary) => {
                fs.unlinkSync(file.path);
                if (error) {
                    reject(file);
                } else {
                    resolve(result);
                }
            }
        );

    })
}


export const FileUploadHeler = { uploadToCloudinary, upload }
