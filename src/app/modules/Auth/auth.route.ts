import express from "express";
import { validateRequestSchema } from "../../middleware/validateRequestSchema";
import { AuthValidationSchema } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = express.Router()

router.post(
    '/register',
    validateRequestSchema(AuthValidationSchema.registerUserValidationSchema),
    AuthControllers.registerUserController,
);

export const AuthRoutes = router;