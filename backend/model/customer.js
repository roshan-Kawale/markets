import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Avatar : {
    type: String,
  },
  categories : [{
    type: String
  }],
  cities : [{
    type: String
  }]
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
