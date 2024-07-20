import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const res = await axios.post("https://freewheel-emmm.onrender.com/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email or Password is incorrect");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="base-container1">
      <div className="content1">
        <form onSubmit={handleSubmit}>
          <div className="form1">
            <h2 className="form-title">Login</h2>
            <div className="form-group1">
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group1">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="footer1">
            <button type="submit" className="btuniya">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
