import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Homepage from "./pages/home";
import Productspage from "./pages/products";
import SingleProduct from "./pages/single-product";
import AddProductPage from "./pages/home/add product";
import EditProductPage from "./pages/home/edit-delete";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/products", element: <Productspage /> },
        { path: "/about", element: <Productspage /> },   
        { path: "/contacts", element: <Productspage /> },
        { path: "/products/:productId", element: <SingleProduct /> },
        { path: "/add-product", element: <AddProductPage /> },
        { path: "/edit-product/:productId", element: <EditProductPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
