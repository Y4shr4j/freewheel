import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import uploadImage from '../components/Form/uploadImage'; 



function Add() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [booking, setBooking] = useState("");
  const [photo, setPhoto] = useState("");

  // Function to upload image to Cloudinary
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vehicle"); // Replace with your Cloudinary upload preset

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`, {
      method: "POST",
      body: formData,
    });

    return response.json();
  };

  // Fetch all categories on component mount
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("https://freewheel-emmm.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Function to handle product creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Upload photo to Cloudinary
      const imageData = await uploadImage(photo);
      if (!imageData.secure_url) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      // Create product data
      const productData = {
        name,
        description,
        startDate,
        endDate,
        price,
        quantity,
        photo: imageData.secure_url, // Use Cloudinary's secure URL
        booking,
        category,
      };

      // Send product data to backend
      const { data } = await axios.post("https://freewheel-emmm.onrender.com/api/v1/product/create-product", productData);
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/");
      } else {
        toast.error(data?.message || "Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // Function to handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) { // 1 MB
      toast.error("Image should be less than or equal to 1 MB");
    } else {
      setPhoto(file);
    }
  };

  return (
    <div className="container-fluid my-3 p-3">
      <h1 className="text-center mb-4">Sell / Rent Vehicle</h1>
      <div className="mx-auto w-75">
        {/* Category Selector */}
        <Select
          bordered={false}
          placeholder="Select a category"
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => setCategory(value)}
          options={categories.map(c => ({ value: c._id, label: c.name }))}
        />

        {/* Photo Upload */}
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              hidden
            />
          </label>
        </div>

        {/* Display uploaded photo */}
        {photo && (
          <div className="mb-3 text-center">
            <img
              src={URL.createObjectURL(photo)}
              alt="product_photo"
              height={"200px"}
              className="img-fluid img-thumbnail"
            />
          </div>
        )}

        {/* Name Input */}
        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="Write a name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className="mb-3">
          <textarea
            type="text"
            value={description}
            placeholder="Write a description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Start Date and End Date Inputs */}
        <div className="mb-3 row">
          <div className="col">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Price Input */}
        <div className="mb-3">
          <input
            type="number"
            value={price}
            placeholder="Write a price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-3">
          <input
            type="number"
            value={quantity}
            placeholder="Write a quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Booking Selector */}
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select Booking"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setBooking(value)}
            options={[
              { value: "0", label: "Sell" },
              { value: "1", label: "Rent" }
            ]}
          />
        </div>

        {/* Submit Button */}
        <div className="mb-3 text-center">
          <button className="btn btn-primary" onClick={handleCreate}>
            ADD PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
