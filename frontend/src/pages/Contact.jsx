import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
const SendEmailForm = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://dukaney-store-backend-1.onrender.com/user/contact', { subject, message }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            enqueueSnackbar('Email sent successfully',{variant: 'success',  autoHideDuration: 1000,});
            setSubject('');
            setMessage('');
        } catch (error) {
            enqueueSnackbar('Failed to send email');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', marginTop:"5%", padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Send your feed back</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                />
                <textarea
                    placeholder='Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', margin: '8px 0', height: '100px' }}
                />
                <button type='submit' style={{ padding: '10px 20px', backgroundColor: ' moccasin', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default SendEmailForm;
