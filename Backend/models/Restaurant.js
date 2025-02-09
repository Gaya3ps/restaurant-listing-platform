import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String }, // URL or file path for the restaurant image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who owns the restaurant
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
