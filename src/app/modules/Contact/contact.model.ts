import { model, Schema } from 'mongoose';

import { excludeDeletedAggregation, excludeDeletedQuery } from '../../utils/moduleSpecific/queryFilters';
import { TContact } from './contact.interface';


const contactSchema = new Schema<TContact>(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            required: true,
        },
        services: {
            type: [String],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// query middleware for soft delete by utils
contactSchema.pre('find', excludeDeletedQuery);
contactSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
contactSchema.pre('aggregate', excludeDeletedAggregation);

export const Contact = model<TContact>('Contact', contactSchema);