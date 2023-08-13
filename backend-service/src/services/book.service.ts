import Book from "../models/Book";
import Review from "../models/Review";
import { CreateBookSchema, UpdateBookSchema } from "../validations/app.validation";
import { uploadFile } from '../utils/file'
import ApiResponse from "../utils/response";

const createBook = async (req, res) => {
    try {
        const { error } = CreateBookSchema.validate(req.body)
        if (error) return res.status(400).json({ error: error.message })
        const { title, description, discountRate, price, coverImageString } = req.body
        const coverImage = await uploadFile(coverImageString)
        const book = await new Book({
            title,
            description,
            discountRate,
            price,
            coverImage
        });
        await book.save()
        return res.status(201).json(ApiResponse.success("Book created successfully", { book }))
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createMultipleBooks = async (req, res) => {
    try {
        const { books } = req.body;
        const bookDocuments = books.map(({ title, description, discountRate, price, coverImageString }) => {
            return {
                title,
                description,
                discountRate,
                price,
                coverImage: coverImageString
            }
        })
        const createdBooks = await Book.insertMany(bookDocuments);
        return res.status(201).json({ success: true, message: "Books created successfully", books: createdBooks });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


const updateBook = async (req, res) => {
    try {
        const { error } = UpdateBookSchema.validate(req.body)
        if (error) return res.status(400).json(ApiResponse.error(error.details[0].message, null))
        const { title, description, discountRate, price, coverImageString } = req.body
        const coverImage = await uploadFile(coverImageString)
        const book = await Book.findByIdAndUpdate(req.params.id, {
            title,
            description,
            discountRate,
            price,
            coverImage
        })
        if (!book) return res.status(404).json(ApiResponse.error("Book not found", null))
        return res.status(200).json(ApiResponse.success("Book updated successfully", { book }))

    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id)
        return res.status(200).json(ApiResponse.success("Book deleted successfully", null))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const getBooks = async (req, res) => {
    try {
        const { page, limit } = req.query
        const books = await Book.find().skip(page * limit).limit(limit)
        return res.status(200).json(ApiResponse.success("Books fetched successfully", { totalCount: books.length, books }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json(ApiResponse.error("Book not found", null))
        return res.status(200).json(ApiResponse.success("Book fetched successfully", { book }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const searchBook = async (req, res) => {
    try {
        const { search } = req.query
        const books = await Book.find({ title: { $regex: search, $options: "$i" } })
        return res.status(200).json(ApiResponse.success("Books fetched successfully", { books }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const createBookReview = async (req, res) => {
    try {
        const { bookId, reviewMessage } = req.body
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).json(ApiResponse.error("Book not found", null))
        const review = await new Review({
            bookId,
            reviewMessage
        })
        await review.save()
        return res.status(201).json(ApiResponse.success("Review created successfully", { review }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.id })
        return res.status(200).json(ApiResponse.success("Reviews fetched successfully", { reviews }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const deleteBookReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        return res.status(200).json(ApiResponse.success("Review deleted successfully", null))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}
const updateBookReview = async (req, res) => {
    try {
        const { reviewMessage } = req.body
        const review = await Review.findByIdAndUpdate(req.params.id, {
            reviewMessage
        })
        if (!review) return res.status(404).json(ApiResponse.error("Review not found", null))
        return res.status(200).json(ApiResponse.success("Review updated successfully", { review }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}

export const getBookReviewsByBook = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Something went wrong", null))
    }
}

const bookService = {
    createBook,
    createMultipleBooks,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
    searchBook,
    createBookReview,
    getBookReviews,
    deleteBookReview,
    updateBookReview,
}

export default bookService