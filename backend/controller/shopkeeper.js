import User from "../model/auth.js";
import Product from "../model/product.js";
import Shopkeeper from "../model/shopkeeper.js";

export const createShopkeeper = async (req, res, next) => {
  try {
    const {
      userId,
      shopName,
      shopDescription,
      shopAddress,
      location,
      businessType,
      businessLicense,
      contactNumber
    } = req.body;

    const validUser = await User.findById(userId);
    if (!validUser) {
      const error = {
        statusCode : 400,
        message: 'User not found'
      }
      return next(error);
    }

    if(validUser.role !== "shopkeeper") {
      const error = {
        statusCode : 400,
        message: 'Your role is not shopkeeper'
      }
      return next(error);
    }

    const checkShopkeeper = await Shopkeeper.findOne({userId : userId});
    if (checkShopkeeper) {
      const error = {
        statusCode : 400,
        message: 'Shopkeeper already created'
      }
      return next(error);
      }

    const shopkeeper = new Shopkeeper({
      userId,
      shopName,
      shopDescription,
      shopAddress,
      location,
      businessType,
      businessLicense,
      contactNumber
    });

    await shopkeeper.save();

    res.status(201).json({ message: 'Shopkeeper created successfully' });
  } catch (error) {
    if(error.message === "Shopkeeper validation failed: contactNumber.0: Invalid contact number. Please enter a 10-digit phone number."){
      const error = {
        statusCode : 400,
        message: 'Invalid contact number.'
      }
      return next(error);
    }
    next(error);
  }
};

export const updateShopkeeper = async (req, res, next) => {
  try {
    const {
      shopkeeperId,
      shopName,
      shopAddress,
      shopDescription,
      contactNumber,
      product,
      status
    } = req.body;

    const validShopkeeper = await Shopkeeper.findById(shopkeeperId);
    if (!validShopkeeper) {
      const error = {
        statusCode: 400,
        message: 'Shopkeeper not found'
      }
      return next(error);
    }
   
    if(product) {
      const validProduct = await Product.findById(product)
      if(!validProduct) {
        const error = {
          statusCode: 400,
          message: 'Product not found'
        }
        return next(error);
      }

    if((validProduct.owner).toString() !== (validShopkeeper._id).toString()) {
      const error = {
        statusCode: 400,
        message: 'You are not product owner'
      }
      return next(error);
    }
  

    // Check if product already exists in shopkeeper's products
    if (((validShopkeeper.products).toString()).includes((product).toString())) {
      const error = {
        statusCode: 400,
        message: 'Product already added to shopkeeper'
      }
      return next(error);
    }
  }

    // Update shopkeeper details
    validShopkeeper.shopName = shopName || validShopkeeper.shopName;
    validShopkeeper.shopAddress = shopAddress || validShopkeeper.shopAddress;
    validShopkeeper.shopDescription = shopDescription || validShopkeeper.shopDescription;
    validShopkeeper.contactNumber = contactNumber || validShopkeeper.contactNumber;
    validShopkeeper.status = status || validShopkeeper.status;

    if(status == "approved") {
      validShopkeeper.isShopkeeper = true;
    }

    if(status == "pending" || status == "rejected") {
      validShopkeeper.isShopkeeper = false;
    }


    // Add products to shopkeeper
    if (product) {
      validShopkeeper.products = validShopkeeper.products.concat(product);
    }

    await validShopkeeper.save();

    res.status(200).json({ message: 'Shopkeeper updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getShopkeeper = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const shopkeeper = await Shopkeeper.findOne({ userId: id }).populate("products" , "imageUrls");
    if (!shopkeeper) {
      return res.status(404).json({success:false , message: "Shopkeeper not found" });
    }

    const validUser = await User.findById(id);
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password: pass, ...userData } = validUser._doc;

    res.status(200).json({shopkeeper , userData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving shopkeeper" });
}
};

export const deleteShopkeeper = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Shopkeeper ID is required" });
    }

    const shopkeeper = await Shopkeeper.findById(id);
    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    // Check if the user is the owner of the shopkeeper
    if (userId.toString() !== shopkeeper.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this shopkeeper" });
    }

    // Delete products associated with the shopkeeper
    await Product.deleteMany({ owner: shopkeeper._id });

    // Delete the shopkeeper
    await Shopkeeper.findByIdAndDelete(id);

    // Delete the user associated with the shopkeeper
    await User.findByIdAndDelete(shopkeeper.userId);

    res.status(200).json({ message: "Shopkeeper deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getShopkeepers = async(req , res) => {
  try {
    const shopkeepers = await Shopkeeper.find().populate("userId" , "name email");
    res.status(200).json(shopkeepers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving shopkeepers" });
  }
}
