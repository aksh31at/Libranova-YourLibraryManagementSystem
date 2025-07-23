import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';


export const getAllUsers=catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find({accountVerified: true})
    res.status(200).json({
        success: true,
        users,
    });
})

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload an image.", 400));
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isRegistered = await User.findOne({ email, accountVerified: true });

    if (isRegistered) {
        return next(new ErrorHandler("User already registered.", 400));
    }

    if (password.length < 8 || password.length > 16) {
        return next(new ErrorHandler("Password must be 8-16 characters long.", 400));
    }

    const { avatar } = req.files;

    const allowedFileTypes = /jpeg|jpg|png|gif/;
    if (!allowedFileTypes.test(avatar.mimetype.split('/')[1])) {
        return next(new ErrorHandler("Please upload a valid image file.", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: 'Library_Management_System_Admin_Avatars',
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown error");
        return next(new ErrorHandler("Failed to upload image to Cloudinary.", 500));
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "Admin",
        accountVerified: true,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        message: "Admin registered successfully.",
        user,
    });
});

