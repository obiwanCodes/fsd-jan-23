import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({
      message: "You do not have access to this resource",
    });
  }
};

export const logger = (req, res, next) => {
  console.log(req.body);
  next();
};
