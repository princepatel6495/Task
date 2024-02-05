import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors({ ...errors, [name]: "This field is required." });
    } else {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        formErrors[field] = "This field is required.";
      }
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const cartItems = cart.map((item) => ({
        productId: item._id,
        name: item.Name,
        quantity: item.quantity,
        price: parseFloat(item.Price.replace("$", "")),
        status: "Pending",
      }));

      const orderData = {
        customer_name: formData.firstName + " " + formData.lastName,
        customer_email: formData.email,
        customer_phone_number: formData.phone,
        customer_address: formData.address,
        customer_city: formData.city,
        customer_state: formData.state,
        customer_zip_code: formData.zipcode,
        orders: cartItems,
      };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}orders`,
          orderData
        );

        if (response.status === 201) {
          setFormData({
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            city: "",
            state: "",
            zipcode: "",
          });
          dispatch(clearCart());
          navigate("/");
          toast.success("Order placed successfully.");
        } else {
          console.error("Error placing order:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">State</label>
            <input
              type="text"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Zipcode</label>
            <input
              type="text"
              className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.zipcode && (
              <div className="invalid-feedback">{errors.zipcode}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
