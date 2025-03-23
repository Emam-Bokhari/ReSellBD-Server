import express from 'express';
import { BlogControllers } from './blog.controller';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { BlogValidationSchema } from './blog.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';


const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequestSchema(BlogValidationSchema.createBlogValidationSchema),
    BlogControllers.createBlogController,
);

router.get('/', BlogControllers.getAllBlogsController);

router.get('/:id', BlogControllers.getBlogController);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequestSchema(BlogValidationSchema.updateBlogValidationSchema),
    BlogControllers.updateBlogController,
);

router.delete('/:id', auth(USER_ROLE.admin), BlogControllers.deleteBlogController);

export const BlogRoutes = router;