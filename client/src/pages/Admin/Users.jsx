import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import AdminMenu from './../../components/Layout/AdminMenu'; // Adjust the import path
import UserForm from './../../components/Form/UserForm'; // Create this component similarly to CategoryForm

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visible, setVisible] = useState(false); // Correctly define the visible state
  const [updatedName, setUpdatedName] = useState('');

  // Fetch all users
  // Fetch all users
const getAllUsers = async () => {
  try {
    const { data } = await axios.get('https://freewheel-emmm.onrender.com/api/v1/users/get-users');
    console.log('API response:', data); // Log API response
    if (data.success) {
      // Filter users with role 0
      const nonAdminUsers = data.users.filter(user => user.role === 0);
      setUsers(nonAdminUsers);
      console.log('Non-admin Users set:', nonAdminUsers); // Log the non-admin users data
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong in fetching users');
  }
};


  useEffect(() => {
    getAllUsers();
  }, []);

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://freewheel-emmm.onrender.com/api/v1/users/update-user/${selectedUser._id}`, {
        name: updatedName,
      });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelectedUser(null);
        setUpdatedName('');
        setVisible(false);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(`https://freewheel-emmm.onrender.com/api/v1/users/delete-user/${userId}`);
      if (data.success) {
        toast.success('User is deleted');
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
  <div className="row">
    <div className="col-md-3">
      <AdminMenu />
    </div>
    <div className="col-md-9">
      <h1 className="text-center mb-4">Manage Users</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(user.name);
                      setSelectedUser(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="p-4">
          <h2 className="mb-4">Edit User</h2>
          <UserForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </div>
      </Modal>
    </div>
  </div>
</div>

  );
};

export default ManageUsers;