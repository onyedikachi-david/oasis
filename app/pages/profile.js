import React from "react";
import Navbar from "@/components/Header";
import { useAppContext } from "@/context/context";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import Navbar from "components/Navbar.js";
// import Footer from "components/Footer.js";

export default function Profile() {
  const {
    connected,
    profileDetails,
    initialized,
    error,
    success,
    setupAccount,
  } = useAppContext();

  const setupAccountSchema = Yup.object().shape({
    f_name: Yup.string().required("First name is required"),
    l_name: Yup.string().required("Last name is required"),
    p_num: Yup.string().required("Phone number is required"),
    location: Yup.string().required("Location is required"),
    customer_type: Yup.string().required("Customer type is required"),
  });

  // if (profileAddress) {
  //   console.log("Profile address", profileAddress);
  // } else {
  //   console.log("Profile address not found");
  // }
  return (
    <>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        {/* <h1>Hehikdnbjej</h1> */}
        {!profileDetails ? (
          <Formik
            initialValues={{
              f_name: "",
              l_name: "",
              p_num: "",
              location: "",
              customer_type: "",
            }}
            validationSchema={setupAccountSchema}
            onSubmit={(values) => {
              setupAccount(values);
            }}
          >
            <Form className="w-full max-w-sm mx-auto mt-8 text-black">
              <div className="relative py-16 bg-gray-300">
                <div className="container mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                      {error && (
                        <div className="text-red-500 mb-2">{error}</div>
                      )}
                      {success && (
                        <div className="text-green-500 mb-2">{success}</div>
                      )}
                      <div className="mb-4">
                        <label htmlFor="f_name">First Name</label>
                        <Field
                          type="text"
                          name="f_name"
                          className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="f_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="l_name">Last Name</label>
                        <Field
                          type="text"
                          name="l_name"
                          className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="l_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="p_num">Phone Number</label>
                        <Field
                          type="text"
                          name="p_num"
                          className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="p_num"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="location">Location</label>
                        <Field
                          type="text"
                          name="location"
                          className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="customer_type">Customer Type</label>
                        <Field
                          as="select"
                          name="customer_type"
                          className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Customer Type</option>
                          <option value="regular">customer</option>
                          <option value="premium">merChant</option>
                        </Field>
                        <ErrorMessage
                          name="customer_type"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        {/* <img
                          alt="..."
                          // src={require("assets/img/team-2-800x800.jpg").default}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        /> */}
                      </div>
                    </div>
                    <h2 className="text-black text-center font-extrabold">
                      Profile Details
                    </h2>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          {profileDetails.authority.toBase58()}
                        </button>
                      </div>
                    </div>
                    {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            22
                          </span>
                          <span className="text-sm text-gray-500">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            10
                          </span>
                          <span className="text-sm text-gray-500">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                          </span>
                          <span className="text-sm text-gray-500">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      {profileDetails.fName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      {profileDetails.lName}
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      {profileDetails.pNum}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      {profileDetails.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* <Footer /> */}
    </>
  );
}
