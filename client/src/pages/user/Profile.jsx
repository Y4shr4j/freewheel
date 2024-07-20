import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        name,
        email,
        phone,
        address,
      };

      // If newPassword is provided, include it in the request
      if (newPassword) {
        requestData.password = password; // Include current password
        requestData.newPassword = newPassword; // Include new password
      }

      const { data } = await axios.put("/api/v1/auth/profile", requestData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile hasn't Updated");
    }
  };

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-8">
          <div className="form-container" style={{ marginTop: "5mb" }}>
            <form onSubmit={handleSubmit}>
              <h3 className="title">USER PROFILE</h3>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Current Password" // Change label to "Current Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your New Password" // Add new input field for new password
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Address"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
