import { useEffect, useState } from "react";
import React from "react";
//get id from url
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  //   const [error, setError] = useState(false);
  const navigate = useNavigate();

  //call param when our page load
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    // console.log(params);
    let result = await fetch(
      `http://localhost:5000/product/get-product/${params.id}`,
      {
        method: "get",
      }
    );
    //convert op into json
    result = await result.json();
    //prefill the data
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  // const updateProduct = async () => {
  //   let result = await fetch(
  //     `http://localhost:5000/product/update-product/${params.id}`,
  //     {
  //       method: "put",
  //       body: JSON.stringify({
  //         name,
  //         price,
  //         category,
  //         company,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   result = await result.json();
  //   navigate("/");
  // };

  const updateProduct = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await fetch(
            `http://localhost:5000/product/update-product/${params.id}`,
            {
              method: "put",
              body: JSON.stringify({
                name,
                price,
                category,
                company,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          let data = await response.json();

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Product Updated",
              text: "The product has been successfully updated.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: data.message || "There was an error updating the product.",
            });
          }

          navigate("/");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "There was a problem connecting to the server.",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "Product update was cancelled.",
        });
      }
    });
  };

  return (
    <div className="register">
      <div className="register_inner">
        <h1>Update Product</h1>
        <input
          className="inputbox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter the product name"
        />
        {/* {error && !name && <span className="error">Enter Valid Name</span>} */}
        <input
          className="inputbox"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="enter the product price"
        />
        {/* {error && !price && <span className="error">Enter Valid price</span>} */}
        <input
          className="inputbox"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="enter the product category"
        />
        {/* {error && !category && (
          <span className="error">Enter Valid Category</span>
        )} */}
        <input
          className="inputbox"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="enter the product company"
        />
        {/* {error && !company && (
          <span className="error">Enter Valid Company</span>
        )} */}
        <button onClick={updateProduct} className="button" type="button">
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;

// prefill data in useState, whose you make in setName etc
