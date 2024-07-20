import React, { useState, useEffect, useCallback } from "react";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";
import SearchInput from "../components/Form/SearchInput";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get("https://freewheel-emmm.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("https://freewheel-emmm.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://freewheel-emmm.onrender.com/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://freewheel-emmm.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("https://freewheel-emmm.onrender.com/api/v1/product/product-filters", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategory();
      await getTotal();
      await getAllProducts();
    };
    fetchData();
  }, [getAllCategory, getTotal, getAllProducts]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length, getAllProducts]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked.length, filterProduct]);

  return (
    <div className="container-fluid my-3 p-3 dashboard">
      <div className="row mt-3">
        <div className="col-md-3">
          <SearchInput />
          <h4 className="text">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
        <div className="col-md-9">
          <h4 className="text-center mb-4">All Products</h4>
          <div className="row">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`https://freewheel-emmm.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 50)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                  <p>Category: {p?.category?.name}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Item added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {products && products.length < total && (
            <div className="text-center mt-4">
              <button
                className="btn btn-primary loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
