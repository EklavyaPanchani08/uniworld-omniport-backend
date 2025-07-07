const { Category } = require("../models/index.js");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "categories not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "categories fetched successfully",
      data: categories, 
    });
  } catch (err) {
    console.error("Error fetching categories details:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories details",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};
module.exports = {
  getCategories
};
