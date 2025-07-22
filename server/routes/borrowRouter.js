import express from 'express';
import { borrowedBooks, getBorrowedBooksForAdmin, recordBorrowedBooks, returnBorrowedBooks} from '../controllers/borrowController.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/record-borrowed-books/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBooks);

router.get("/borrowed-books-by-users", isAuthenticated, isAuthorized("Admin"), getBorrowedBooksForAdmin);

router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);

router.put("/return-borrowed-books/:id", isAuthenticated, returnBorrowedBooks);

export default router;