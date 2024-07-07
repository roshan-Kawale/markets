import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  status: { type: String, default: "pending" },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
