import User from "../model/auth.js";
import Customer from "../model/customer.js";

export const createCustomer = async (req, res, next) => {
  try {
    const {
      userId,
      addresses,
      contactNumber,
      orders,
      cart
    } = req.body;

    const validUser = await User.findById(userId);
    if (!validUser) {
      const error = {
        statusCode : 400,
        message: 'User not found'
      }
      return next(error);
    }

    if(validUser.role !== "consumer") {
      const error = {
        statusCode : 400,
        message: 'Your role is not customer'
      }
      return next(error);
    }

    const checkCustomer = await Customer.findOne({userId : userId});
    if (checkCustomer) {
      const error = {
        statusCode : 400,
        message: 'Already exist in database'
      }
      return next(error);
      }

    const customer = new Customer({
      userId,
      addresses,
      contactNumber,
      orders,
      cart
    });

    await customer.save();

    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
        next(error);
    }
  }
