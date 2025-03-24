import { model, Schema } from 'mongoose';
import { TNewsLetter } from './newsLetter.interface';

const newsLetterSchema = new Schema<TNewsLetter>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const NewsLetter = model<TNewsLetter>('NewsLetter', newsLetterSchema);
