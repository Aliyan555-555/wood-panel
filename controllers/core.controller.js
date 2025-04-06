const CoreModel = require("../model/core.model.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const CreateCore = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message, status: false });
    }

    try {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", status: false });
      }
      const uniqueFileName = `${Date.now()}${Math.floor(Math.random() * 1000000000)}${path.extname(req.file.originalname)}`;
      const uploadPath = path.join(__dirname, "../upload", uniqueFileName);
      fs.writeFileSync(uploadPath, req.file.buffer);
      const coreData = await CoreModel.create({ ...req.body, source: `${baseUrl}/uploads/${uniqueFileName}` });
      if (!coreData) {
        return res.status(404).json({ message: "Core not found", status: false });
      }

      res.status(201).json({
        status: true,
        core: coreData,
        message: "core successfully created",
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: false }); // Handle validation errors
    }
  });
};
 
const UpdateCore = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const updatedCore = await CoreModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCore) {
      return res.status(404).json({ message: "Core not found", status: false });
    }
    res.json({
      status: true,
      core: updatedCore,
      message: "core successfully updated",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false }); // Handle validation errors
  }
};
const UpdateCoreWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message, status: false });
    }

    const { id } = req.params; // Get the ID from the request parameters
    try {
      const core = await CoreModel.findById(id);
      if (!core) {
        return res.status(404).json({ message: "Core not found", status: false });
      }

      let updatedData = { ...req.body};

      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const uniqueFileName = `${Date.now()}${Math.floor(Math.random() * 1000000000)}${path.extname(req.file.originalname)}`;
        const uploadPath = path.join(__dirname, "../upload", uniqueFileName);
        fs.writeFileSync(uploadPath, req.file.buffer);
        updatedData.source = `${baseUrl}/uploads/${uniqueFileName}`;
      }

      const updatedCore = await CoreModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      res.json({
        status: true,
        core: updatedCore,
        message: "core successfully updated",
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  });
};

const DeleteCore = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const deletedCore = await CoreModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedCore) {
      return res.status(404).json({ message: "Core not found", status: false });
    }
    res.status(200).json({
      status: true,
      message: "core successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
const GetAllCore = async (req, res) => {
  try {
    const allCore = await CoreModel.find({ isDeleted: false });
    if (!allCore) {
      return res.status(404).json({ message: "core not found",status: false });
    }
    res.status(200).json({
      status: true,
      message: "successfully fetched all core",
      core: allCore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const GetCoreByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Name is required", status: false });
    }

    const core = await CoreModel.findOne({ name });
    if (!core) {
      return res.status(404).json({ message: "Core not found", status: false });
    }

    res.status(200).json({
      status: true,
      message: "Successfully fetched core",
      core: core,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
const GetCoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const core = await CoreModel.findById(id);
    if (!core) {
      return res.status(404).json({ message: "core not found", status: false });
    }
    res.status(200).json({
      status: true,
      message: "successfully fetched core",
      core: core,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  UpdateCoreWithFile,
  GetCoreById,
  GetCoreByName,
  GetAllCore,
  CreateCore,
  UpdateCore,
  DeleteCore,
};
