import Router from 'express'
import bookService from '../services/book.service'

const bookRouter = Router()

bookRouter.post("/new", bookService.createBook)
bookRouter.post("/create-multiple", bookService.createMultipleBooks)
bookRouter.put("/update/:id", bookService.updateBook)
bookRouter.delete("/delete/:id", bookService.deleteBook)
bookRouter.get("/all", bookService.getBooks)
bookRouter.get("/:id", bookService.getBookById)
bookRouter.get("/search?search=:search")
bookRouter.post("/add-review", bookService.createBookReview)
bookRouter.get("/get-reviews/:id", bookService.getBookReviews)

export default bookRouter