import Product from "../model/product.js";
import Shopkeeper from "../model/shopkeeper.js";

export const createProduct = async (req, res , next) => {
  try {
    const {
      productName,
      caption,
      imageUrls,
      owner,
      price,
      discountPercentage,
      category,
    } = req.body;

    const validUser = await Shopkeeper.findOne({userId : owner}).populate();
    console.log(validUser._id)
    if (!validUser) {
      const error = {
        statusCode : 400,
        message: 'Not valid user'
      }
      return next(error);
    }

    const product = new Product({
      productName,
      caption,
      imageUrls,
      owner : validUser._id,
      price,
      discountPercentage,
      category,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('owner');

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('owner');

    if (!product) {
      const error = {
        statusCode: 404,
        message: 'Product not found'
      }
      return next(error);
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving product" });
  }
};

export const likeAndUnlikeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.likes.includes(req.body.userId)) {
      const index = product.likes.indexOf(req.body.userId);

      product.likes.splice(index, 1);

      await product.save();

      return res.status(200).json({
        success: true,
        message: "product Unliked",
      });
    } else {
      product.likes.push(req.body.userId);

      await product.save();

      return res.status(200).json({
        success: true,
        message: "product Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const commentOnProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    let commentIndex = -1;

    // Checking if comment already exists

    product.comments.forEach((item, index) => {
      if (item.user.toString() === req.body.userId) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      product.comments[commentIndex].comment = req.body.comment;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      product.comments.push({
        user: req.body.userId,
        comment: req.body.comment,
      });

      await product.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};