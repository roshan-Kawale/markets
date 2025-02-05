import User from "../model/auth.js";
import Customer from "../model/customer.js";

export const createCustomer = async (req, res, next) => {
  try {
    const { userId, addresses, contactNumber, orders, cart } = req.body;

    const validUser = await User.findById(userId);
    if (!validUser) {
      const error = {
        statusCode: 400,
        message: "User not found",
      };
      return next(error);
    }

    if (validUser.role !== "consumer") {
      const error = {
        statusCode: 400,
        message: "Your role is not customer",
      };
      return next(error);
    }

    const checkCustomer = await Customer.findOne({ userId: userId });
    if (checkCustomer) {
      const error = {
        statusCode: 400,
        message: "Already exist in database",
      };
      return next(error);
    }

    const customer = new Customer({
      userId,
      addresses,
      contactNumber,
      orders,
      cart,
    });

    await customer.save();

    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const customer = await Customer.findOne({ userId: id });
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const validUser = await User.findById(id);
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password: pass, ...userData } = validUser._doc;

    res.status(200).json({ customer, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving shopkeeper" });
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { customerId, category, city } = req.body;

    const validCustomer = await Customer.findById(customerId);
    if (!validCustomer) {
      const error = {
        statusCode: 400,
        message: "Customer not found",
      };
      return next(error);
    }

    if (category) {
      if (validCustomer.categories.includes(category)) {
        const index = validCustomer.categories.indexOf(category);
        validCustomer.categories.splice(index, 1);
      } else {
        validCustomer.categories = validCustomer.categories.concat(category);
      }
      await validCustomer.save();
      return res.status(200).json({
        success: true,
        message: "Customer categories updated successfully",
      });
    }

    if (city) {
      if (validCustomer.cities.includes(city)) {
        const index = validCustomer.cities.indexOf(city);
        validCustomer.cities.splice(index, 1);
      } else {
        validCustomer.cities = validCustomer.cities.concat(city);
      }
      await validCustomer.save();
      return res.status(200).json({
        success: true,
        message: "Customer cities updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
