import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['shopkeeper', 'consumer', 'admin'],
    default: 'consumer'
  },
  verified: {
    type: Boolean,
    default:false
  },
  savedProduct : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }],
});

const User = mongoose.model('User', userSchema);

export default User;