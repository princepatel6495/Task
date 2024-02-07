import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    toast.success("Item added to the cart");
    const cartItem = cart.find((item) => item._id === product._id);
    if (cartItem) {
      dispatch(incrementQuantity(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row-reverse">
        <button className="btn btn-link" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
      {product ? (
        <div className="row">
          <div className="col-md-4">
            <img src={product.Image} alt={product.Name} className="img-fluid" />
          </div>
          <div className="col-md-8">
            <h1>{product.Name}</h1>
            <p>Price: {product.Price}</p>
            <p>Category: {product.Category || "No category available"}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-success mr-2"
                style={{ margin: "0 5px" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <div className="btn-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDecrement(product)}
                >
                  -
                </button>
                <button className="btn btn-secondary" disabled>
                  {cart.length > 0
                    ? cart.find((item) => item._id === product._id)?.quantity ||
                      0
                    : 0}
                </button>
                <button
                  className="btn btn-secondary mr-5"
                  onClick={() => handleIncrement(product)}
                >
                  +
                </button>
              </div>

              {cart && cart.length > 0 && (
                <button
                  className="btn btn-warning mr-2"
                  style={{ margin: "0 5px" }}
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
