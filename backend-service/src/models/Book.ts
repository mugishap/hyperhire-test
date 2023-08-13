import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true
    },
    description: {
        type: String,
        min: 10,
        max: 500,
        required: true
    },
    discountRate: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
})

const Book = model("Book", bookSchema)
export default Book