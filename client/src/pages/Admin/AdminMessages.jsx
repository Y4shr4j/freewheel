import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'reactstrap';
import AdminMenu from "./../../components/Layout/AdminMenu";


const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/v1/contact');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container-fluid m-3 p-3">
      <Row>
        <Col md="3" className="admin-menu">
          <AdminMenu />
        </Col>
        <Col md="9">
          <h2 className="mt-4 mb-4">Contact Messages</h2>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={message._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  <td>{new Date(message.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMessages;
