import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createNewCategory = async (req, resizeBy) => {
  const { name, image } = req.body;
  const newCategory = new Category({
    name: name,
    image: image,
  });
  const category = newCategory.save();
  resizeBy.status(200).json(category);
};

export const getAllProducts = async (req, res, next) => {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 50;
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate("category");

    res.status(200).json(products);
  } catch (error) {}
};

export const createNewProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new Product({
      name: name,
      description: description,
      price: price,
    });

    const products = await newProduct.save();
    res.status(200).json(products);
  } catch (error) {}
};

const productController = {
  createNewCategory,
  getAllProducts,
  createNewProduct,
};

export default productController;
