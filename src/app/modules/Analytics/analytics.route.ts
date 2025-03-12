import express from "express"
import { AnalyticsControllers } from "./analytics.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.get("/products-added", auth(USER_ROLE.user, USER_ROLE.admin), AnalyticsControllers.getTotalProductsAddedController)

export const AnalyticsRoutes = router;