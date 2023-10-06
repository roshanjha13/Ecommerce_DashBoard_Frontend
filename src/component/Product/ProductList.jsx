import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/product/get-products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  // const deleteProduct = async (id) => {
  //   let result = await fetch(
  //     `http://localhost:5000/product/delete-product/${id}`,
  //     {
  //       method: "delete",
  //     }
  //   );
  //   result = await result.json();
  //   if (result) {
  //     getProducts();
  //   }
  // };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await fetch(
            `http://localhost:5000/product/delete-product/${id}`,
            {
              method: "delete",
            }
          );

          let data = await response.json();

          if (data) {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            getProducts();
          } else {
            Swal.fire(
              "Error!",
              "There was an issue deleting the product.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Failed!",
            "There was an error connecting to the server.",
            "error"
          );
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your product is safe :)", "error");
      }
    });
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5000/product/search-products/${key}`
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search-product-box"
        type="text"
        placeholder="search product"
        onChange={searchHandle}
      />
      <ul>
        <li>S.No.</li>

        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
        <li>Action</li>
      </ul>
      {products.length > 0 ? (
        products.map((elem, index) => (
          <ul key={elem._id}>
            <li>{index + 1}</li>
            <li>{elem.name}</li>
            <li>{elem.price}</li>
            <li>{elem.company}</li>
            <li>{elem.category}</li>
            <li>
              <button onClick={() => deleteProduct(elem._id)}>Delete</button>

              <Link to={`/update-product/${elem._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>OOPs ! ... No Product Found </h1>
      )}
    </div>
  );
};

export default ProductList;
