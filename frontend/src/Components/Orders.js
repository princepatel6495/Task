import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [email, setEmail] = useState("");
  const [orderList, setOrderList] = useState();
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}orders/get-order-by-email/${email}`
      );

      if (response.status === 200) {
        if (response.data && response.data.length > 0) {
          setOrderList(response.data);
        } else {
          console.log("No orders found for the given email");
          setOrderList([]);
        }
      } else {
        console.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order List</h2>
      <div className="row">
        <div className="col-md-9 mb-3">
          <label className="form-label">Enter Email ID:</label>
          <input
            type="email"
            className={`form-control w-50 ${
              email ? (emailValid ? "is-valid" : "is-invalid") : ""
            }`}
            value={email}
            onChange={handleEmailChange}
          />

          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={!emailValid}
          >
            Submit
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <label className="invisible">Submit</label>
        </div>
      </div>

      <table className="table">
        {loading && <p>Loading...</p>}
        {!loading && orderList && orderList?.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="5">No records found for the given email.</td>
            </tr>
          </tbody>
        )}
        {!loading && orderList && orderList.length > 0 && (
          <>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) =>
                order.orders.map((product) => (
                  <tr key={product._id}>
                    <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Orders;
