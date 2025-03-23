import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { NewsLetterServices } from "./newsLetter.service";

const createNewsLetterController = asyncHandler(async (req, res) => {
    const newsLetterPayload = req.body;
    const createdNewsLetter = await NewsLetterServices.createNewsLetter(newsLetterPayload);
    sendResponse(res, {
        success: true,
        message: 'NewsLetter is created successfully',
        statusCode: 201,
        data: createdNewsLetter,
    });
});

const getAllNewsLettersController = asyncHandler(async (req, res) => {
    const newsLetters = await NewsLetterServices.getAllNewsLetters();
    sendResponse(res, {
        success: true,
        message: 'NewsLetters are retrieved successfully',
        statusCode: 200,
        data: newsLetters,
    });
});

export const NewsLetterControllers = {
    createNewsLetterController,
    getAllNewsLettersController,
}