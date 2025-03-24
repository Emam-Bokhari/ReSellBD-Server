'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const blog_service_1 = require('./blog.service');
const createBlogController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const blogPayload = req.body;
    const createdBlog =
      yield blog_service_1.BlogServices.createBlog(blogPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 201,
      message: 'Blog is created successfully',
      data: createdBlog,
    });
  }),
);
const getAllBlogsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_service_1.BlogServices.getAllBlogs();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Blogs are retrieved successfully',
      data: blogs,
    });
  }),
);
const getBlogController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield blog_service_1.BlogServices.getBlogById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Blog is retrieved successfully',
      data: blog,
    });
  }),
);
const updateBlogController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedBlog = yield blog_service_1.BlogServices.updateBlogById(
      id,
      updatedPayload,
    );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Blog is updated successfully',
      data: updatedBlog,
    });
  }),
);
const deleteBlogController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield blog_service_1.BlogServices.deleteBlogById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      statusCode: 200,
      message: 'Blog is deleted successfully',
      data: {},
    });
  }),
);
exports.BlogControllers = {
  createBlogController,
  getAllBlogsController,
  getBlogController,
  updateBlogController,
  deleteBlogController,
};
