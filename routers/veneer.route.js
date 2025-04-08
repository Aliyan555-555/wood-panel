const express = require("express");
const VeneerController = require("../controllers/veneer.controller.js");

const VeneerRouter = express.Router();

VeneerRouter.post("/", VeneerController.CreateVeneer); // Create veneer route
VeneerRouter.put("/:id", VeneerController.UpdateVeneer); // Update veneer route
VeneerRouter.delete("/:id", VeneerController.DeleteVeneer); // Delete veneer route
VeneerRouter.get("/", VeneerController.GetAllVeneer); // Get all veneers route
VeneerRouter.get("/:id", VeneerController.GetVeneerById); // Get veneer by ID route

module.exports = VeneerRouter;
