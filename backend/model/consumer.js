import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: 'Invalid contact number. Please enter a 10-digit phone number.'
    }
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;