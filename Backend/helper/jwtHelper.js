import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "gaya3";

export const generateToken = (user, id , email, role) => {
  try {
    const token = jwt.sign({ user, id , email, role }, SECRET_KEY, {
      expiresIn: "2h",
    });
    return { token };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Token generation failed");
  }
};
