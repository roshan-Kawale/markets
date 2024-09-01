import Product from "../model/product.js";
import Shopkeeper from "../model/shopkeeper.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      caption,
      imageUrls,
      owner,
      price,
      discount,
      category,
    } = req.body;

    const validUser = await Shopkeeper.findOne({ userId: owner }).populate();
    if (!validUser) {
      const error = {
        statusCode: 400,
        message: "Not valid user",
      };
      return next(error);
    }

    const product = new Product({
      productName,
      caption,
      imageUrls,
      owner: validUser._id,
      price,
      discount,
      category,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const {
      productName,
      caption,
      imageUrls,
      price,
      discount,
      category,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      const error = {
        statusCode: 404,
        message: "Product not found",
      };
      return next(error);
    }

    product.productName = productName || product.productName;
    product.caption = caption || product.caption;
    product.imageUrls = imageUrls || product.imageUrls;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.category = category || product.category;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const category = req.query.category || "";
    const city = req.query.city || "";
    const rating = req.query.rating || "";

    let query = {
      productName: { $regex: searchTerm, $options: "i" },
      category: { $regex: category, $options: "i" },
    };

    if (rating) {
      query.overallRating = { $gte: rating };
    }

    const products = await Product.find(query).populate({
      path: 'owner',
      match: city ? { 'shopAddress.city': { $regex: city, $options: "i" } } : {}
    });

    const filteredProducts = products.filter(product => product.owner !== null);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId)
      .populate({
        path: "likes",
        select: "name role",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name role",
        },
      })
      .populate("owner");

    if (!product) {
      const error = {
        statusCode: 404,
        message: "Product not found",
      };
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
    console.log(product);

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


// rating systemm
export const ratingOnProduct =  async (req, res) => {
  const { productId } = req.params;
  const { rating , userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const existingRating = product.ratings.find((rating) => rating.userId.toString() === userId.toString());
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      product.ratings.push({ userId, rating });
    }

    // Calculate the overall rating
    const totalRating = product.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const overallRating = (totalRating / product.ratings.length).toFixed(1);
    // Update the product document with the new overall rating
    product.overallRating = overallRating;

    await product.save();
    res.send({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error submitting rating' });
  }
};
