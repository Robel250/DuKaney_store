import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/store-logo.png';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://dukaney-store-backend-1.onrender.com/user/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dukaney-store-backend-1.onrender.com/user/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ recipients: selectedEmails, subject, message }),
            });

            const result = await response.json();
            alert(result.message);

            setSubject('');
            setMessage('');
            setSelectedEmails([]);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleSelection = (e) => {
        const { value, checked } = e.target;
        setSelectedEmails((prev) =>
            checked ? [...prev, value] : prev.filter((email) => email !== value)
        );
    };

    return (
        <div className="d-flex justify-content-center mt-4" style={{ width: '80%', marginLeft: '13%' }}>
            <div className="card" style={{ width: '55%', padding: '20px', boxShadow: '5px 5px rgb(224, 195, 158)' }}>
                <div className="text-center">
                    <h1 className="mb-4">
                        <img src={logo} alt="Store Logo" style={{ height: '50px', width: '50px', marginTop: '10px' }} />
                        DuKaney Store - Email Sender
                    </h1>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="card-title">Select Recipients</h2>
                        <div className="row">
                            {users.map((user) => (
                                <div key={user.email} className="col-md-6">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={user.email}
                                            onChange={handleSelection}
                                            checked={selectedEmails.includes(user.email)}
                                            id={`user-${user.email}`}
                                            style={{ borderColor: '#00b8b8', boxShadow: '5px 5px rgb(224, 195, 158)' }}
                                        />
                                        <label className="form-check-label" htmlFor={`user-${user.email}`}>
                                            {user.username} ({user.email})
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Compose Email</h2>
                        <form onSubmit={sendEmail}>
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    style={{ borderColor: '#00b8b8', boxShadow: '5px 5px rgb(224, 195, 158)' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="5"
                                    required
                                    style={{ borderColor: '#00b8b8', boxShadow: '5px 5px rgb(224, 195, 158)' }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn  mt-3" 
                                style={{ color: 'black', background: 'linear-gradient(to right, rgb(224, 195, 158), moccasin)', }}
                            >
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
