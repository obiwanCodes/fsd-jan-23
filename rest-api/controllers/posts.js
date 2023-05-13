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
