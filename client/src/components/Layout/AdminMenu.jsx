import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
   
      <div className="col-md-10 text-center dashboard-menu">
        <div className="list-group ">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Update Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/blogs"
            className="list-group-item list-group-item-action"
          >
            Update Blogs
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> 
          <NavLink
            to="/dashboard/admin/comments"
            className="list-group-item list-group-item-action"
          >
            Comments
          </NavLink> 
        </div>
      </div>
   
  );
};

export default AdminMenu;