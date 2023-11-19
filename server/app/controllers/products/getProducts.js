import httpStatus from 'http-status';
import sendResponse from '../../../utils/helpers/SendResponse.js';
import catchAsync from "../../../utils/helpers/catchAsync.js";
import Product from '../../models/productSchema.js';

const getProducts = catchAsync(
    async (req, res) => {

        // finding all products
        const result = await Product.find();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Products are retrieved successfully!',
            data: result,
        });
    }
)

export default getProducts