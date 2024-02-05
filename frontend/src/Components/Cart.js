import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/actions";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const overallTotal =
    cart &&
    cart.reduce(
      (total, item) =>
        total + parseInt(item.Price.replace("$", "")) * item.quantity,
      0
    );

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="container mt-4">
      {cart.length === 0 ? (
        <div className="alert alert-info border-info">Cart is empty</div>
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body">
              {cart.map((item, index) => (
                <div key={index} className="mb-2">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <strong>{item.Name}</strong>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.Price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="alert alert-success border-success">
            Overall Total: ${overallTotal.toFixed(2)}
          </div>

          <Link to="/checkout" className="btn btn-primary mt-3">
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
