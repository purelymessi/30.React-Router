import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});

export default function AddProductPage({ addProduct }) {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = axios.post("http://localhost:3000/products", values);
      const newProduct = response.data;

      if (addProduct) {
        addProduct(newProduct);
      }

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="container mt-24 flex justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Add Product
        </h2>
        <p className="text-center mb-8 text-gray-600">
          To add a product, fill the form and press add
        </p>

        <Formik
          initialValues={{
            title: "",
            price: 0,
            description: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="relative w-full mb-4">
                <input
                  className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder=" "
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 duration-300 transform scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Title
                </label>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="relative w-full mb-4">
                <input
                  className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder=" "
                />
                <label
                  htmlFor="price"
                  className="absolute text-sm text-gray-500 duration-300 transform scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Price
                </label>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="relative w-full mb-4">
                <input
                  className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder=" "
                />
                <label
                  htmlFor="description"
                  className="absolute text-sm text-gray-500 duration-300 transform scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Description
                </label>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="relative w-full mb-4">
                <input
                  className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
                  type="text"
                  name="image"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.image}
                  placeholder=" "
                />
                <label
                  htmlFor="image"
                  className="absolute text-sm text-gray-500 duration-300 transform scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Image URL
                </label>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                className="bg-black text-white w-full p-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
