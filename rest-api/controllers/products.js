import Product from "../models/products.js";

export const getProducts = async (req, res) => {
  const { category } = req.query;
  if (category) return res.send(await Product.find({ category: category }));
  return res.send(await Product.find());
};

export const getProductById = async (req, res) => {
  const reqProduct = await Product.findById(req.params.id);
  if (!reqProduct)
    return res.status(404).send({
      message: `No product found with the given id`,
    });
  return res.send(reqProduct);
};

export const createProduct = async (req, res) => {
  let newProduct;
  try {
    newProduct = await Product.create(req.body);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
  return res.status(201).send(newProduct);
};

export const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    return res.status(400).send({
      messsage: error.messsage,
    });
  }
  return res.status(200).send(await Product.findById(req.params.id));
};

export const deleteProduct = async (req, res) => {
  const reqProduct = await Product.findById(req.params.id);
  if (!reqProduct)
    return res.status(404).send({
      message: `No product found with the given id`,
    });
  await Product.findByIdAndDelete(req.params.id);
  return res.status(204).send();
};
