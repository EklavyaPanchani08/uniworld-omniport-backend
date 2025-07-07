const { Op } = require("sequelize");
const { Product, Category } = require("../models/index.js");

const addProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Product data is required" });
    }
    const { name, description, price, discountPrice, image, categoryId } =
      req.body;

    if (!name || !price || !discountPrice || !categoryId) {
      return res.status(400).json({ message: "Required filed missing" });
    }

    const productData = {
      name,
      description,
      price,
      discountPrice,
      categoryId,
      image,
    };
    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Error adding product::", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Update data is required" });
    }
    const [updated] = await Product.update(req.body, { where: { id } });
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findByPk(id);
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error("Error updating product::", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const deleted = await Product.destroy({ where: { id } });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product::", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const whereClause = {};
    if (req?.query?.search) {
      // SEARCH BY PRODUCT NAME
      whereClause.name = {
        [Op.like]: `%${req?.query?.search}%`,
      };
    }
    if (req?.query?.category) {
      // FILTER BY CATEGORY ID
      whereClause.categoryId = req?.query?.category;
    }
    const products = await Product.findAll({
      where: whereClause,
      include: {
        model: Category,
        attributes: ["name"],
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("Error fetching products::", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        attributes: ["id", "name"],
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error("Error fetching product details:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product details",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
};
