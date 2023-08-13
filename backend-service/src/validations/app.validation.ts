import Joi from "joi"

export const CreateBookSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(10).max(500),
    discountRate: Joi.number().required().min(0).max(100),
    price: Joi.number().required().min(0),
    coverImageString: Joi.string().required(),
})

export const UpdateBookSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(10).max(500),
    discountRate: Joi.number().required().min(0).max(100),
    price: Joi.number().required().min(0),
    coverImageString: Joi.string().required(),
})

export const CreateReviewSchema = Joi.object({
    bookId: Joi.string().required(),
    reviewMessage: Joi.string().required().min(10).max(500),
})

export const UpdateReviewSchema = Joi.object({
    reviewMessage: Joi.string().required().min(10).max(500),
})