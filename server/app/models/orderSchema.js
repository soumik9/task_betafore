import { Schema, Types, model } from 'mongoose';

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
    },
    status: {
        type: String,
        default: 'Proccessing'
    },
}, { timestamps: true });

const Order = model("Order", orderSchema);
export default Order;