import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/productdetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

 // Initial details
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://freewheel-emmm.onrender.com/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://freewheel-emmm.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-2">
  <div className="row product-details">
    <div className="col-md-6">
      <img
        src={`https://freewheel-emmm.onrender.com/api/v1/product/product-photo/${product._id}`}
        className="card-img-top product-image"
        alt={product.name}
      />
    </div>
    <div className="col-md-6 product-details-info">
      <h1 className="text-center">Product Details</h1>
      <hr />
      <h6><strong>Name:</strong> {product.name}</h6>
      <h6><strong>Description:</strong> {product.description}</h6>
      <h6>
        <strong>Price:</strong>{" "}
        {product?.price?.toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        })}
      </h6>
      <h6><strong>Category:</strong> {product?.category?.name}</h6>
      <button className="btn btn-secondary mt-3"
        onClick={() => {
          setCart([...cart, product]);
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart, product])
          );
          toast.success("Item Added to cart");
        }}
      >
        ADD TO CART
      </button>
    </div>
  </div>
  <hr />
  <div className="row similar-products">
    <h4>Similar Products ➡️</h4>
    {relatedProducts.length < 1 && (
      <p className="text-center">No Similar Products found</p>
    )}
    <div className="d-flex flex-wrap">
      {relatedProducts?.map((p) => (
        <div className="card m-2 similar-product-card" key={p._id}>
          <img
            src={`https://freewheel-emmm.onrender.com/api/v1/product/product-photo/${p._id}`}
            className="card-img-top similar-product-image"
            alt={p.name}
          />
          <div className="card-body">
            <div className="card-name-price">
              <h5 className="card-title">{p.name}</h5>
              <h5 className="card-title card-price">
                {p.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </h5>
            </div>
            <p className="card-text">{p.description.substring(0, 60)}...</p>
            <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    MORE DETAILS
                  </button>
                  <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default ProductDetails;




