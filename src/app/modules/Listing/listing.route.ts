import express from "express";
import { ListingControllers } from "./listing.controller";

const router = express.Router();

router.post("/", ListingControllers.createListingController);

router.get("/", ListingControllers.getAllListingsController);

router.get("/:id", ListingControllers.getListingByIdController);

router.patch("/:id", ListingControllers.updateListingByIdController);

router.delete("/:id", ListingControllers.deleteListingByIdController)

export const ListingRoutes = router;