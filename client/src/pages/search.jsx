import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const SearchResults = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {values?.results.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text">$ {p.price}</p>
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
      </div>
    </div>
  );
};

export default SearchResults;
