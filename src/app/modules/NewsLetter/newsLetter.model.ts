import { model, Schema } from 'mongoose';
import { TNewsLetter } from './newsLetter.interface';

const newsLetterSchema = new Schema<TNewsLetter>({
  email: {
    type: String,
    required: true,
  },
});

export const NewsLetter = model<TNewsLetter>('NewsLetter', newsLetterSchema);
