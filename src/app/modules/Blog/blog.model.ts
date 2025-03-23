import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    authorName: {
      type: String,
      trim: true,
      required: true,
    },
    introduction: {
      type: String,
      trim: true,
      required: true,
    },
    mainContent: {
      type: String,
      trim: true,
      required: true,
    },
    tags: {
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
blogSchema.pre('find', excludeDeletedQuery);
blogSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
blogSchema.pre('aggregate', excludeDeletedAggregation);

export const Blog = model<TBlog>('Blog', blogSchema);
