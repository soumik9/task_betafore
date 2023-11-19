import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'User is required']
    },
    products: [
        {
            type: Types.ObjectId,
            ref: "Product"
        },
    ],
    total: {
        type: Number,
        required: [true, 'total field is required']
    },
    stripeId: {
        type: String,
        required: [true, 'String field is required']
    },
    status: {
        type: String,
        default: 'Proccessing'
    },
}, { timestamps: true });

const Product = model("order", orderSchema);
export default Product;