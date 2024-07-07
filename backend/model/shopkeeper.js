import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    type: String,
    required: true
  },
  shopDescription: {
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
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

export default Shopkeeper;