import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function EditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${productId}`).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/products/${productId}`, product);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="container mt-24 flex justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Edit Product
        </h2>
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
        </div>
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <input
            className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
        </div>
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleUpdate}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
