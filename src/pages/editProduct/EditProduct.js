import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  //-This simply holds the products we want to edit.
  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    //-Reason why we use setProduct(productEdit); is because if the user refresh the page, we want to make sure
    //we get the data from the database.
    setProduct(productEdit);
    setImagePreview(
      //-URL is saved in the image file path.
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    setDescription(
      productEdit && productEdit.description ? productEdit.description : null
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    //-We need the first file
    setProductImage(e.target.files[0]);
    //-This will give you temporary access to be able to preview the file that you just selected from our compouter.
    //-The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    //-Reason why using FormData here is because we need to store the image file.
    //-The FormData object lets you compile a set of key/value pairs to send
    const formData = new FormData();
    //Check first in the product object, whether it has a name property, and if there is a name property, append it.
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(typeof formData);
    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };
 
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
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
