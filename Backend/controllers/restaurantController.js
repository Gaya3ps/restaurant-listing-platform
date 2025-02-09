import Restaurant from "../models/Restaurant.js";

// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const restaurants = await Restaurant.find({ userId });

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new restaurant
export const addRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, address, contact } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Handle the uploaded image file
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the restaurant entry
    const newRestaurant = new Restaurant({
      name,
      address,
      contact,
      image,
      userId,
    });
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, address, contact };
    if (image) updatedData.image = image;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Server error" });
  }
};
