import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import { Card, Button, Form } from 'react-bootstrap';

const SellMultipleItems = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [barcode, setBarcode] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [promptQuantity, setPromptQuantity] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      enqueueSnackbar('Authorization token is missing. Please log in.', { variant: 'error' });
    }
  }, [token, enqueueSnackbar]);

  const handleScan = (result) => {
    if (result) {
      setBarcode(result.text);
      fetchItemDetails(result.text);
    }
  };

  const fetchItemDetails = async (barcode) => {
    try {
      const response = await axios.get(`https://dukaney-store-backend-1.onrender.com/items/barcode/${barcode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const item = response.data;
      if (item) {
        setCurrentItem(item);
        setPromptQuantity(true);
      } else {
        enqueueSnackbar('Item not found', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to fetch item data', { variant: 'error' });
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddItem = () => {
    if (!quantity || quantity <= 0) {
      enqueueSnackbar('Please enter a valid quantity.', { variant: 'warning' });
      return;
    }
    setItems([...items, { ...currentItem, quantitySold: parseInt(quantity, 10) }]);
    setPromptQuantity(false);
    setQuantity(1);
    setCurrentItem(null);
    setBarcode('');
    enqueueSnackbar('Item added successfully', { variant: 'success' });
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    enqueueSnackbar('Item removed', { variant: 'info' });
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      enqueueSnackbar('No items to sell.', { variant: 'warning' });
      return;
    }

    const itemsToSell = items.map(item => ({
      barcode: item.barcode,
      quantitySold: item.quantitySold,
    }));

    axios.post('https://dukaney-store-backend-1.onrender.com/items/sell-multiple', { items: itemsToSell }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      enqueueSnackbar('Items sold successfully', { variant: 'success' });
      setItems([]);
    }).catch(() => {
      enqueueSnackbar('Error processing sale', { variant: 'error' });
    });
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantitySold), 0);

  return (
    <div className="d-flex justify-content-center mt-4" style={{ width: '60%', marginLeft: '25%' }}>
      <Card style={{ width: '40rem', padding: '20px' }}>
        <Card.Body>
          <h1 className='text-center mb-4'>Sell Multiple Items</h1>

          <BarcodeScannerComponent width='100%' height={500} onUpdate={(err, result) => result && handleScan(result)} />

          {promptQuantity && currentItem && (
            <Form.Group className='mb-3'>
              <Form.Label>Enter Quantity for {currentItem.name}</Form.Label>
              <Form.Control type='number' value={quantity} onChange={handleQuantityChange} min='1' style={{ borderColor: '5px #00b8b8', boxShadow: '5px 5px rgb(224, 195, 158)' }} />
              <Button onClick={handleAddItem} variant='primary' className='mt-3' style={{ color: 'black', background: 'linear-gradient(to right,rgb(224, 195, 158), moccasin)' }}>Add to List</Button>
            </Form.Group>
          )}

          <h3 className='mt-4'>Scanned Items</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.name} - {item.quantitySold} to sell - ${item.price * item.quantitySold}
                <Button variant='link' onClick={() => handleRemoveItem(index)} style={{ color: 'red' }}>
                  <FaTrash />
                </Button>
              </li>
            ))}
          </ul>

          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          <Button onClick={handleSubmit}  variant='primary' className='mt-3' style={{ color: 'black', background: 'linear-gradient(to right,rgb(224, 195, 158), moccasin)' }} >Product sell</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SellMultipleItems;
