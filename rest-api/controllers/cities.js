import { cities } from "../server.js";

export const getCities = (req, res) => {
  res.send(cities);
};
