import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { AnalyticsServices } from "./analytics.service";


const getTotalProductsAddedController = asyncHandler(async (req, res) => {
    const { identifier } = req.user;
    const totalProductsAdded = await AnalyticsServices.getTotalProductsAdded(identifier);
    sendResponse(res, {
        success: true,
        message: "Retrieve total products added data",
        statusCode: 200,
        data: totalProductsAdded,
    })

})

export const AnalyticsControllers = {
    getTotalProductsAddedController,
}