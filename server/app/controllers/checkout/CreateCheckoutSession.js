import httpStatus from 'http-status';
import sendResponse from '../../../utils/helpers/SendResponse.js';
import catchAsync from "../../../utils/helpers/catchAsync.js";
import config from '../../../utils/server/config.js';
import stripe from 'stripe';
const stripeInstance = stripe(String(config.STRIPE_SECRET_KEY));

const CreateCheckoutSession = catchAsync(
    async (req, res) => {

        const { products, user } = req.body;

        // console.log(products);
        // console.log(user);

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "bdt",
                product_data: {
                    name: product.title,
                },
                unit_amount: product.price * 100
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

        console.log(session);

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