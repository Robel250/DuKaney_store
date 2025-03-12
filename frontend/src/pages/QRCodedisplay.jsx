import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarcodeQR = ({ barcode }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        if (barcode) {
            // Fetch QR code for barcode from the backend
            axios.get(`/api/items/barcode/${barcode}`)
                .then(response => {
                    setQrCodeUrl(response.data.qrCodeUrl);
                })
                .catch(error => {
                    console.error("Error fetching QR code:", error);
                });
        }
    }, [barcode]);

    return (
        <div>
            {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="Barcode QR Code" />
            ) : (
                <p>Loading QR code...</p>
            )}
        </div>
    );
};

export default BarcodeQR;
