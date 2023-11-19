import httpStatus from 'http-status';
import sendResponse from '../../../utils/helpers/SendResponse.js';
import catchAsync from "../../../utils/helpers/catchAsync.js";
import config from '../../../utils/server/config.js';
import stripe from 'stripe';
import Order from '../../models/orderSchema.js';
const stripeInstance = stripe(String(config.STRIPE_SECRET_KEY));

const CreateCheckoutSession = catchAsync(
    async (req, res) => {

        const { products, user, total } = req.body;

        let productsIDs = [];

        // getting all products id
        products.map(({ _id }) => {
            productsIDs.push(_id)
        })

        // setting line items
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "bdt",
                product_data: {
                    name: product.title,
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: 1
        }))

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${config.CLIENT_URL}checkout/success`,
            cancel_url: `${config.CLIENT_URL}checkout/cancel`,
        })


        // session done then store in db
        if (session.id) {

            // data
            const data = {
                user,
                products: productsIDs,
                total,
            }

            // saving data
            await Order.create(req.body);
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Products are retrieved successfully!',
            data: {
                id: session.id
            },
        });
    }
)

export default CreateCheckoutSession