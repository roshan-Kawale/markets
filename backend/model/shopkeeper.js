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
    type: {
      area: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true }
    },
    required: true
  },
  isShopkeeper : {
    type: Boolean,
    default : false
  },
  status : {
    type : String,
    default : "pending"
  },
  location: {
    type : {
      lat: {type: Number},
      lng: {type: Number}
    }
  },
  shopDescription: {
    type: String
  },
  businessType: {
    type: String,
    required: true
  },
  businessLicense: {
    type: String,
    required: true
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
  }],
});

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

export default Shopkeeper;