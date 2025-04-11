const express = require("express");
const CoreController = require("../controllers/core.controller.js");

const CoreRouter = express.Router();

CoreRouter.post("/", CoreController.CreateCore); // Create core route
CoreRouter.put("/:id", CoreController.UpdateCoreWithFile); // Update core route
CoreRouter.delete("/:id", CoreController.DeleteCore); // Delete core route
CoreRouter.get("/", CoreController.GetAllCore); // Get all cores route
CoreRouter.get("/:id", CoreController.GetCoreById); // Get core by ID route
CoreRouter.get("/search/:name", CoreController.GetCoreByName); // Get core by name route

module.exports = CoreRouter;
