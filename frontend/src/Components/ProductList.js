// ProductList.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { toast } from "react-toastify";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products`
        );
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to the cart");
  };

  return (
    <div className="container mt-5">
      <h1>Product Listing</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {currentProducts.map((product) => (
              <div key={product._id} className="col-md-3 mb-4">
                <div className="card">
                  <Link to={`/product/${product._id}`} className="card-link">
                    <img
                      src={product.Image}
                      className="card-img-top"
                      alt={product.Name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <Link to={`/product/${product._id}`} className="card-link">
                      <h5
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.Name}
                      </h5>
                    </Link>
                    <p className="card-text">Price: {product.Price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav>
            <ul className="pagination justify-content-center">
              {Array(Math.ceil(allProducts.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ProductList;
