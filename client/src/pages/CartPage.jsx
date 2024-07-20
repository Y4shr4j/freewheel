import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        return total
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://freewheel-emmm.onrender.com/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://freewheel-emmm.onrender.com/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center bg-light p-4 mb-3">
          {!auth?.user
            ? "Hello Guest"
            : `Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <p className="text-center">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout!"}`
            : "Your Cart Is Empty"}
        </p>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          {cart?.map((p) => (
            <div className="row card flex-row mb-3" key={p._id}>
              <div className="col-md-4">
                <img
                  src={`https://freewheel-emmm.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width="100%"
                  height="130px"
                />
              </div>
              <div className="col-md-4">
                <p className="fw-bold">{p.name}</p>
                <p>{p.description.substring(0, 30)}...</p>
                <p className="fw-bold">Price: ${p.price}</p>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-5">
          <div className="cart-summary p-3 bg-light rounded">
            <h2 className="text-center">Cart Summary</h2>
            <p className="text-center">Total | Checkout | Payment</p>
            <hr />
            <h4 className="text-center">Total: ${totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3 text-center">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3 text-center">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-3 text-center">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartPage;