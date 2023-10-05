import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const initialState = {
  name: "",
  category: "",
  price: "",
  quantity: "",
};

export default function AddProduct() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  //-We are going to process the product image in a unique way, so it to be in its own state.
  const [productImage, setProductImage] = useState("");
  //-This is going to hold a preview image
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    //-User may select more than one file.
    //-We need the first file
    setProductImage(e.target.files[0]);
    //-This will give you temporary access to be able to preview the file that you just selected from our computer.
    //-The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    //Using the FormData we can be able to process the image and send the image to the back end.
    //-Reason why using FormData here is because we need to store the image file.
    //-The FormData object lets you compile a set of key/value pairs to send
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(typeof formData);
    //-Object
    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
}
