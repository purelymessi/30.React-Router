import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function ProductsPage() {
  const headers = [
    "Product name",
    "Product image",
    "Product price",
    "Actions",
  ];
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="container mt-10">
      <Toaster />
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">
        Products Editing/Deleting
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-3 px-4 border-b text-gray-800">{product.title}</td>
              <td className="py-3 px-4 border-b">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-auto object-cover"
                />
              </td>
              <td className="py-3 px-4 border-b text-gray-800">${product.price}</td>
              <td className="py-3 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
