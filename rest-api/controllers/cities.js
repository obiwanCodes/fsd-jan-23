import db from "../server.js";
import { v4 as uuidv4 } from "uuid";
import citySchema, { patchCitySchema } from "../schemas/city.js";

export const getCities = (req, res) => {
  const { name } = req.query;
  if (name === undefined) return res.send(db.data.cities);
  return res.send(
    db.data.cities.filter((cityObj) =>
      cityObj.city.toLowerCase().startsWith(name.toLowerCase())
    )
  );
};

export const getCityById = (req, res) => {
  const { id } = req.params;
  const reqCity = db.data.cities.find((city) => city.id === id);
  if (reqCity) return res.send(reqCity);
  return res.status(404).send({
    messaage: "Could not find a city with this ID",
  });
};

export const createCity = (req, res) => {
  const validation = citySchema.validate(req.body);
  if (validation?.error) {
    return res.status(400).send({
      message: validation?.error?.details[0].message,
    });
  }
  const newCity = { id: uuidv4(), ...req.body };
  db.data.cities.push(newCity);
  db.write();
  res.status(201).send(newCity);
};

export const replaceCity = (req, res) => {
  const { id } = req.params;
  let idx;
  db.data.cities.forEach((city, index) => {
    if (city.id === id) idx = index;
  });
  if (idx === undefined)
    return res.status(404).send({
      messaage: "Could not find a city with this ID",
    });
  const validation = citySchema.validate(req.body);
  if (validation?.error) {
    return res.status(400).send({
      message: validation?.error?.details[0].message,
    });
  }
  const { city, description, image } = req.body;
  const reqCity = {
    id: id,
    city: city,
    description: description,
    image: image,
  };
  db.data.cities[idx] = reqCity;
  db.write();
  res.send(reqCity);
};

export const updateCity = (req, res) => {
  const { id } = req.params;
  let idx;
  db.data.cities.forEach((city, index) => {
    if (city.id === id) idx = index;
  });
  if (idx === undefined)
    return res.status(404).send({
      messaage: "Could not find a city with this ID",
    });
  const validation = patchCitySchema.validate(req.body);
  if (validation?.error) {
    return res.status(400).send({
      message: validation?.error?.details[0].message,
    });
  }
  const { city, description, image } = req.body;
  const reqCity = db.data.cities[idx];
  if (city) reqCity.city = city;
  if (description) reqCity.description = description;
  if (image) reqCity.image = image;
  db.write();
  return res.send(reqCity);
};

export const deleteCity = (req, res) => {
  const { id } = req.params;
  let idx;
  db.data.cities.forEach((city, index) => {
    if (city.id === id) idx = index;
  });
  if (idx === undefined)
    return res.status(404).send({
      messaage: "Could not find a city with this ID",
    });
  db.data.cities = db.data.cities.filter((city) => city.id !== id);
  db.write();
  // return res.status(200).send({
  //   message: `City with id: ${id} was successfully deleted`,
  // });
  return res.status(204).send();
};
