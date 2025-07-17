import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // helps prevent XSS
    sameSite: "strict", // helps prevent CSRF
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
  });

  return token;
};
