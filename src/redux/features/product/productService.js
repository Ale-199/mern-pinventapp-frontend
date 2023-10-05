import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;

//Create a new product
const createProduct = async (formData) => {
  const res = await axios.post(API_URL, formData);
  return res.data;
};

//Get all products
const getProducts = async (formData) => {
  const res = await axios.get(API_URL);
  return res.data;
};

//Delete a product
const deleteProduct = async (id) => {
  const res = await axios.delete(API_URL + id);
  return res.data;
};

// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const prodcutService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default prodcutService;
