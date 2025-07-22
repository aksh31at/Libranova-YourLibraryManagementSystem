import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {Borrow} from "../models/borrowModel.js";
import { User } from "../models/userModels.js";
import { Book } from "../models/bookModel.js";

export const borrowedBooks= catchAsyncErrors(async (req, res, next) => {
    
})

export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const {id}= req.params;
    const{email}= req.body;
    
    const book= await Book.findById(id);
    if(!book){
        return next(new ErrorHandler("Book not found", 404));
    }
    const user= await User.findOne({ email });
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    if(book.quantity===0){
        return next(new ErrorHandler("Book is not available", 400));
    }
    const isAreadyBorrowed= user.borrowedBooks.find(
        b=> b.book.toString()===id&&b.returned===false
    )
    if(isAreadyBorrowed){
        return next(new ErrorHandler("You have already borrowed this book", 400));
    }
    book.quantity--;
    book.availability= book.quantity > 0;
    await book.save();

    user.borrowedBooks.push({
        bookId:book._id,
        bookTitle: book.title,
        borrowDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })
    await user.save();
    await Borrow.create({
        user:{
            id: user._id,
            name: user.name,
            email: user.email
    }, 
        book: book._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        price: book.price,
    });
    res.status(200).json({
        success: true,
        message: "Book borrowed and recorded successfully",
    })
});


export const getBorrowedBooksForAdmin= catchAsyncErrors(async (req, res, next) => {

})

export const returnBorrowedBooks = catchAsyncErrors(async (req, res, next) => {

})

