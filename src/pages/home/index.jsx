import { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import Loading from "../../components/Loading";

function Homepage() {
  const [NewProducts, setNewProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      setNewProducts(res.data);
      setProducts(res.data);
    });
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
