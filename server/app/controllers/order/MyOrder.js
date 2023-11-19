import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import Order from "../../models/orderSchema.js";

const MyOrder = catchAsync(
    async (req, res) => {

        // finding MyOrder
        const data = await Order.find({ user: req.user._id }).populate("user products");

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `My Order retrived successfully!`,
            data: data
        });
    }
)

export default MyOrder