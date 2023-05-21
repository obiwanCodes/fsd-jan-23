import db from "../server.js";
import { v4 as uuidv4 } from "uuid";
//import adventureSchema, { patchAdventureSchema } from "../schemas/adventures.js";

export const getAdventures = (req, res) => {
  const { cityId } = req.query;
  if (cityId === undefined) return res.send(db.data.adventures);
  return res.send(
    db.data.adventures.filter((adventures) => adventures.id === cityId)
  );
};
