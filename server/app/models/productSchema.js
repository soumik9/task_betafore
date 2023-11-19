import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    image: {
        type: String,
        required: [true, 'Image field is required']
    },
    description: {
        type: String,
        required: [true, 'description field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
}, { timestamps: true });

const Product = model("Product", productSchema);
export default Product;