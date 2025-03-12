import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackTable from '../components/Home/BackTable';
import { Card, Form, Button } from 'react-bootstrap';

const ShowBook = () => {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`http://localhost:4444/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, token]);

    // Format Date for better display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Formats to the local date/time format
    };

    return (
        <div className="d-flex justify-content-center mt-4" style={{ width: "60%", marginLeft: "25%" }}>
            <Card style={{ width: '40rem', padding: '20px' }}>
                <Card.Body>
                    <h1 className='text-center mb-4'>Show Product</h1>

                    <Form>
                        {item.image && (
                            <div className="w-100 mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid"
                                />
                            </div>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={item.name || ''}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={item.quantity || ''}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={item.price || ''}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={formatDate(item.expiryDate)}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Creation Time</Form.Label>
                            <Form.Control
                                type="text"
                                value={formatDate(item.createdAt)}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Update Time</Form.Label>
                            <Form.Control
                                type="text"
                                value={formatDate(item.updatedAt)}
                                disabled
                                style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
                            />
                        </Form.Group>

                        <Link to={`/items/sell/${id}`}>
                            <Button variant="primary" className="mt-3" style={{ color: "black", background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)" }}>
                                Sell This Item
                            </Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShowBook;
