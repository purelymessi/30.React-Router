import { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import Loading from "../../components/Loading";

function Homepage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="container mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="mt-64">
          <Loading />
        </div>
      )}
    </>
  );
}

export default Homepage;
