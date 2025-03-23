import { TNewsLetter } from "./newsLetter.interface";
import { NewsLetter } from "./newsLetter.model";

const createNewsLetter = async (payload: TNewsLetter) => {
    const createdNewsLetter = await NewsLetter.create(payload);
    return createdNewsLetter;
}

export const NewsLetterServices = {
    createNewsLetter,
}