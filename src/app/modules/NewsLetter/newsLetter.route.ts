import express from "express";
import { NewsLetterControllers } from "./newsLetter.controller";
import { validateRequestSchema } from "../../middleware/validateRequestSchema";
import { NewsLetterValidationSchema } from "./newsLetter.validation";

const router = express.Router();

router.post("/", validateRequestSchema(NewsLetterValidationSchema.createNewsLetterValidationSchema), NewsLetterControllers.createNewsLetterController);

router.get("/", NewsLetterControllers.getAllNewsLettersController)

export const NewsLetterRoutes = router;