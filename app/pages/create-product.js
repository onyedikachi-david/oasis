import React from "react";
import Navbar from "@/components/Header";
import { useAppContext } from "@/context/context";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateProduct() {
  const {
    connected,
    profileDetails,
    initCounter,
    initialized,
    error,
    success,
    setupAccount,
    createProduct,
  } = useAppContext();

  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    available_quantity: Yup.number().required("Available quantity is required"),
  });

  return (
    <>
      <Navbar />
      <div
        className="w-full min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 
          flex items-center justify-center py-10"
      >
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-black">
          <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              available_quantity: "",
            }}
            validationSchema={createProductSchema}
            onSubmit={(values) => {
              createProduct(values);
            }}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Product Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-2">
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-2">
                  Price
                </label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="available_quantity"
                  className="block font-medium mb-2"
                >
                  Available Quantity
                </label>
                <Field
                  id="available_quantity"
                  name="available_quantity"
                  type="number"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
                <ErrorMessage
                  name="available_quantity"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Product
              </button>
            </Form>
          </Formik>
          <button
            onClick={initCounter}
            className="bg-blue-500 flex hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Init counter
          </button>
        </div>
      </div>
    </>
  );
}
