// import { Router } from 'express';
// const userController = require('../controllers/userController')

// const userRouter = Router();

// userRouter.post('/register',userController.userRegistration);

// module.exports = router;

// routes/userRoutes.js
import { Router } from "express";
import multer from "multer";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const userRouter = Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Restaurant routes
userRouter.get("/restaurants", authenticateUser, getRestaurants);
userRouter.post(
  "/restaurants",
  authenticateUser,
  upload.single("image"),
  addRestaurant
);
userRouter.put(
  "/restaurants/:id",
  upload.single("image"),
  authenticateUser,
  updateRestaurant
);
userRouter.delete("/restaurants/:id", authenticateUser, deleteRestaurant);

export default userRouter;
