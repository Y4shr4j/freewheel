import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/find-car-form.css";
import '../../styles/productList.css'; // Custom CSS file
import SearchInput from "../Form/SearchInput";

function ProductList() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFindClick = async () => {
    try {
      const response = await fetch(`api/v1/product/search?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" >
        Enter Dates and Find Available Products
      </h2>

      <div className="form-group row mb-3">
        <label className="col-sm-2 col-form-label">Start Date:</label>
        <div className="col-sm-3">
          <input
            type="date"
            className="form-control rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <label className="col-sm-2 col-form-label">End Date:</label>
        <div className="col-sm-3">
          <input
            type="date"
            className="form-control rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-sm-2 d-flex align-items-center">
          <button className="btn btn-primary w-100 rounded" onClick={handleFindClick}>
            Find
          </button>
        </div>
      </div>

      <SearchInput />

      <h2 className="text-center mt-5">Products Available in Range</h2>

      
      <div className="row mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100 rounded">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Price: ₹{p.price}</p>
                  <Link to={`/product/${p.slug}`} className="btn btn-primary mt-auto rounded">Check Out</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available for the selected dates.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
