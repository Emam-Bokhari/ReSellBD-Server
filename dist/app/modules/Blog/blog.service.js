"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const blog_model_1 = require("./blog.model");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlog = yield blog_model_1.Blog.create(payload);
    return createdBlog;
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_model_1.Blog.find();
    if (blogs.length === 0) {
        throw new HttpError_1.HttpError(404, 'Blogs were not found in the database');
    }
    return blogs;
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new HttpError_1.HttpError(404, 'The requested blog could not be found.');
    }
    return blog;
});
const updateBlogById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.Blog.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedBlog) {
        throw new HttpError_1.HttpError(404, 'The requested blog could not be found.');
    }
    return updatedBlog;
});
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blog_model_1.Blog.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedBlog) {
        throw new HttpError_1.HttpError(404, 'The requested blog could not be found.');
    }
    return deletedBlog;
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};
