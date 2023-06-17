import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.userId,
      userEmail: user.userEmail,
      userRole: user.userRole
    },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "15m" }
  );
};
