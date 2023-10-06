import { useState } from "react";
import React from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const submitProduct = async () => {
    // if (!name || !price || !company || !category) {
    //   setError(true);
    //   return false;
    // }

    // // console.log(name, price, category, company);
    // //set user id in local storage
    // const userId = JSON.parse(localStorage.getItem("user"))._id;
    // // console.log(userId);
    // let result = await fetch("http://localhost:5000/product/add-product", {
    //   method: "post",
    //   body: JSON.stringify({ name, price, category, company, userId }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // result = await result.json();

    // setCategory("");
    // setCompany("");
    // setPrice("");
    // setName("");

    // console.log(result);
    if (!name || !price || !company || !category) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result;
    try {
      const response = await fetch(
        "http://localhost:5000/product/add-product",
        {
          method: "post",
          body: JSON.stringify({ name, price, category, company, userId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result = await response.json();

      if (response.ok) {
        // Checking if HTTP status code is in the 200-299 range
        Swal.fire({
          icon: "success",
          title: "Product Added ",
          text: "Your product has been successfully added.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "There was an error adding the product.", // Assuming there might be a message field in the result.
        });
      }

      setCategory("");
      setCompany("");
      setPrice("");
      setName("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "There was a problem connecting to the server.",
      });
    }
  };

  return (
    <div className="register">
      <div className="register_inner">
        <h1>Add Product</h1>
        <input
          className="inputbox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the product name"
        />
        {error && !name && <span className="error">Enter Valid Name</span>}
        <input
          className="inputbox"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter the product price"
        />
        {error && !price && <span className="error">Enter Valid price</span>}
        <input
          className="inputbox"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter the product category"
        />
        {error && !category && (
          <span className="error">Enter Valid Category</span>
        )}
        <input
          className="inputbox"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter the product company"
        />
        {error && !company && (
          <span className="error">Enter Valid Company</span>
        )}
        <button onClick={submitProduct} className="button" type="button">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
