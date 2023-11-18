import httpStatus from 'http-status';
import sendResponse from '../../../utils/helpers/SendResponse.js';
import { productsJSON } from '../../../utils/constants/constants.js';
import catchAsync from "../../../utils/helpers/catchAsync.js";

const getProducts = catchAsync(
    async (req, res) => {

        // finding all products
        const result = productsJSON;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Products are retrieved successfully!',
            data: result,
        });
    }
)

export default getProducts