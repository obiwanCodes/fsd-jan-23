import axios from "axios";

export const getPosts = async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return res.send(response?.data);
};

export const getPostById = async (req, res) => {
  let response;
  try {
    response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
    );
  } catch (error) {
    return res
      .status(error?.response?.status)
      .send(error?.response?.statusText);
  }
  return res.send(response?.data);
};

export const createPost = async (req, res) => {
  let response;
  try {
    response = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      req.body
    );
  } catch (error) {
    return res
      .status(error?.response?.status)
      .send(error?.response?.statusText);
  }
  return res.send(response?.data);
};

export const replacePost = async (req, res) => {
  let response;
  try {
    response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`,
      req.body
    );
  } catch (error) {
    return res
      .status(error?.response?.status)
      .send(error?.response?.statusText);
  }
  return res.send(response?.data);
};

export const updatePost = async (req, res) => {
  let response;
  try {
    response = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`,
      req.body
    );
  } catch (error) {
    return res
      .status(error?.response?.status)
      .send(error?.response?.statusText);
  }
  return res.send(response?.data);
};

export const deletePost = async (req, res) => {
  let response;
  try {
    response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
    );
  } catch (error) {
    return res
      .status(error?.response?.status)
      .send(error?.response?.statusText);
  }
  return res.send(response?.data);
};
