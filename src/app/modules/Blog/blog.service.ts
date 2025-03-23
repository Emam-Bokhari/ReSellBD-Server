import { HttpError } from '../../errors/HttpError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
    const createdBlog = await Blog.create(payload);
    return createdBlog;
};

const getAllBlogs = async () => {
    const blogs = await Blog.find();

    if (blogs.length === 0) {
        throw new HttpError(404, 'Blogs were not found in the database');
    }

    return blogs;
};

const getBlogById = async (id: string) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new HttpError(404, 'The requested blog could not be found.');
    }
    return blog;
};

const updateBlogById = async (id: string, payload: Partial<TBlog>) => {
    const updatedBlog = await Blog.findOneAndUpdate(
        { _id: id, isDeleted: false },
        payload,
        { new: true, runValidators: true },
    );

    if (!updatedBlog) {
        throw new HttpError(404, 'The requested blog could not be found.');
    }
    return updatedBlog;
};

const deleteBlogById = async (id: string) => {
    const deletedBlog = await Blog.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedBlog) {
        throw new HttpError(404, 'The requested blog could not be found.');
    }
    return deletedBlog;
};

export const BlogServices = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};