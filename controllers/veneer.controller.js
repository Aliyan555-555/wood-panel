const VeneerModel = require("../model/veneer.model.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const CreateVeneer = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message, status: false });
    }
    try {
      const VeneerExist = await VeneerModel.find({value: req.body.value,isDeleted: false});
      if (VeneerExist.length > 0) {
        return res
         .status(400)
         .json({ message: "Veneer already exists", status: false });
      }
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "No file uploaded", status: false });
      }
      const uniqueFileName = `${Date.now()}${Math.floor(
        Math.random() * 1000000000
      )}${path.extname(req.file.originalname)}`;
      const uploadPath = path.join(__dirname, "../upload", uniqueFileName);
      fs.writeFileSync(uploadPath, req.file.buffer);
      const veneerData = await VeneerModel.create({
        ...req.body,
        source: `${baseUrl}/uploads/${uniqueFileName}`,
      });
      if (!veneerData) {
        return res
          .status(404)
          .json({ message: "Veneer not found", status: false });
      }
      res.status(201).json({
        status: true,
        veneer: veneerData,
        message: "Veneer successfully created",
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  });
};

const UpdateVeneer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVeneer = await VeneerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVeneer) {
      return res
        .status(404)
        .json({ message: "Veneer not found", status: false });
    }
    res.status(200).json({
      status: true,
      veneer: updatedVeneer,
      message: "Veneer successfully updated",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

const DeleteVeneer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVeneer = await VeneerModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedVeneer) {
      return res
        .status(404)
        .json({ message: "Veneer not found", status: false });
    }
    res.status(200).json({
      status: true,
      message: "Veneer successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
const GetAllVeneer = async (req, res) => {
  try {
    const veneer = await VeneerModel.find({ isDeleted: false });
    res.status(200).json({
      status: true,
      veneer: veneer,
      message: "All veneers retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const GetVeneerById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const veneer = await VeneerModel.findById(id);
    if (!veneer) {
      return res
        .status(404)
        .json({ message: "Veneer not found", status: false });
    }
    res.status(200).json({
      status: true,
      veneer: veneer,
      message: "Veneer retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

module.exports = {
  CreateVeneer,
  UpdateVeneer,
  DeleteVeneer,
  GetAllVeneer,
  GetVeneerById,
};
