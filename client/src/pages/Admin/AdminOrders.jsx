import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import toast from 'react-hot-toast';
import AdminMenu from './../../components/Layout/AdminMenu';
import moment from "moment";
import { useAuth } from '../../context/auth';
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process","Processing","Shipped","Delivered","Cancelled"]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://freewheel-emmm.onrender.com/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`https://freewheel-emmm.onrender.com/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div key={o._id} className="border shadow mb-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s) => (
                          <Option key={s} value={s}>{s}</Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p) => (
                  <div key={p._id} className="row mb-2 p-3 card flex-row">
                    <div className="col-md-4">
                      <img
                        src={`https://freewheel-emmm.onrender.com/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height={"100px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
