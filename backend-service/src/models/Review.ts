import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },
    reviewMessage: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }
})

const Review = model("Review", reviewSchema)
export default Review