import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import QRCode from "react-qr-code";
import { Card, Button, Form } from 'react-bootstrap';

function CreateBooks() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [barcode, setBarcode] = useState('');
  const [image, setImage] = useState(null);
  const [scanUrl, setScanUrl] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [scanOption, setScanOption] = useState(''); // State for selected scan option
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Cloudinary Upload Function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "robell"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dzqyjbkze"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzqyjbkze/image/upload",
        formData
      );
      if (response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error('Image URL not returned from Cloudinary');
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      enqueueSnackbar("Image upload failed", { variant: "error" });
      return null;
    }
  };

  const handleSaveBooks = async () => {
    if (!name || !quantity || !price || !expiryDate || !barcode || !image) {
      enqueueSnackbar("All fields are required", { variant: 'warning' });
      return;
    }

    let imageUrl = '';
    if (image) {
      // Upload image to Cloudinary
      imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        enqueueSnackbar("Failed to upload image", { variant: 'error' });
        return; // Stop further processing if image upload fails
      }
    }

    // Create the JSON object with form values and image URL
    const itemData = {
      name,
      quantity,
      price,
      expiryDate,
      barcode,
      image: imageUrl, // Include the image URL
    };

    const token = localStorage.getItem("token");

    try {
      // Send the JSON object to the backend
      const response = await axios.post('https://dukaney-store-backend-1.onrender.com/items', itemData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Success feedback and redirection
      enqueueSnackbar("Item created successfully", { variant: 'success' });
      navigate('/home');
    } catch (error) {
      console.error("Error creating item:", error);
      enqueueSnackbar("Error creating item. Please try again.", { variant: 'error' });
    }
  };

  const generateScanUrl = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const url = `https://dukaney-store-backend-1.onrender.com/scan/${randomId}`;
    setScanUrl(url);
  };

  const handleBarcodeScan = (result) => {
    if (result) {
      setBarcode(result.text);
      enqueueSnackbar(`Barcode Scanned: ${result.text}`, { variant: "success" });
      setScannerActive(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType !== 'image') {
        enqueueSnackbar("Please select a valid image file", { variant: "warning" });
        return;
      }
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="d-flex justify-content-center mt-4" style={{width:"60%", 
                  marginLeft:"25%",
                  

    }}>
      <Card style={{ width: '40rem', padding: '20px' }}>
        <Card.Body>
          <h1 className='text-center mb-4'>Create Item</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name Item</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} style={{ borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" style={{ borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" style={{ borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} style={{ borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)" }} />
            </Form.Group>
  {/* Image Upload */}
  <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} style={{ borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)" }}/>
              {imagePreview && (
                <div className="image-preview mt-2">
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                </div>
              )}
            </Form.Group>
            {/* Selection for Barcode Scan Option */}
            <Form.Group className="mb-3">
              <Form.Label>Select Barcode Scan Method</Form.Label>
              <Form.Control as="select" value={scanOption} onChange={e => setScanOption(e.target.value)} style={{borderColor: '5px     #00b8b8', boxShadow:"5px 5px rgb(224, 195, 158)"}}>
                <option value="">Select an option</option>
                <option value="computer">Scan Barcode (Computer)</option>
                <option value="phone">Scan Barcode (Phone)</option>
              </Form.Control>
            </Form.Group>

            {/* Barcode Scan (Computer) */}
            {scanOption === 'computer' && (
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center">
                  <Button variant="secondary" onClick={() => setScannerActive(!scannerActive)}>
                    {scannerActive ? "Turn Off Scanner" : "Turn On Scanner"}
                  </Button>
                  <Form.Control
                    type="text"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    className="ml-3"
                    style={{ maxWidth: '200px' }}
                    placeholder="Scanned Barcode"
                    disabled
                   
                  />
                </div>
                {scannerActive && (
                  <div className='barcode-scanner-container mt-3' style={{ maxWidth: '300px' }}>
                    <BarcodeScannerComponent onUpdate={(err, result) => handleBarcodeScan(result)} />
                  </div>
                )}
              </Form.Group>
            )}

            {/* Barcode Scan (Phone) */}
            {scanOption === 'phone' && (
              <Form.Group className="mb-3">
                <Form.Label>Scan Barcode (Phone)</Form.Label>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" onClick={generateScanUrl} className="ml-auto">
                    {scanUrl ? "Turn Off Scanner" : "Turn On Scanner"}
                  </Button> 
                  <Form.Control
                    type="text"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    className="ml-3"
                    style={{ maxWidth: '200px' }}
                    placeholder="Scanned Barcode"
                    disabled
                  />
                </div>
                {scanUrl && (
                  <div className="mt-3">
                    <QRCode value={scanUrl} />
                    <p>Scan this code with your phone to scan the barcode.</p>
                  </div>
                )}
              </Form.Group>
            )}

         

          

            <Button variant="primary" onClick={handleSaveBooks} className="mt-3"style={{color:"black" ,
  background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)"
}}>Save</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateBooks;




