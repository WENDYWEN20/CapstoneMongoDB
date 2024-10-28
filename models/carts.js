import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  name: { type: String, required: true},
  images: { type: String },
  price: {
    type: Number,
    required: true,
  },

});

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;
