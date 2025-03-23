import { HttpError } from "../../errors/HttpError";
import { TNewsLetter } from "./newsLetter.interface";
import { NewsLetter } from "./newsLetter.model";

const createNewsLetter = async (payload: TNewsLetter) => {
    const createdNewsLetter = await NewsLetter.create(payload);
    return createdNewsLetter;
}

const getAllNewsLetters = async () => {
    const newsLetters = await NewsLetter.find();
    if (newsLetters.length === 0) {
        throw new HttpError(404, 'No newsLetter record were found in the database');
    }
    return newsLetters;
}

export const NewsLetterServices = {
    createNewsLetter,
    getAllNewsLetters,
}