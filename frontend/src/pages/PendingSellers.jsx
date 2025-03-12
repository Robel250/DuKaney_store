import { useEffect, useState } from 'react';
import axios from 'axios';

const PendingSellers = () => {
    const [sellers, setSellers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            alert("Unauthorized: No token found. Please log in.");
            return;
        }
        // Fetch pending sellers with authorization header
        axios.get('http://localhost:4444/user/pending-sellers', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setSellers(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    const approveSeller = async (id) => {
        if (!token) {
            alert("Unauthorized: No token found. Please log in.");
            return;
        }
        try {
            await axios.put(`http://localhost:4444/user/approve/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Seller approved successfully');
            setSellers(sellers.filter(seller => seller._id !== id));
        } catch (error) {
            alert('Failed to approve seller');
            console.error(error);
        }
    };

    return (
        <div className='card' style={{ marginLeft: "25%",width:"500px" ,marginTop:"30px"}}>
            <h2 >Pending Sellers</h2>
            <ul style={{listStyle:"none", fontSize:"15px", fontWeight: "bold",}}>
                {sellers.map((seller) => (
                    <li className='card' key={seller._id} style={{paddingBottom:"10px"}}>
                        {seller.username} - {seller.email}
                        <button onClick={() => approveSeller(seller._id)} style={{
              background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)",
              color: "",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "30px",
              border: "none",
              transition: "0.3s",
              marginLeft:"10px"
              
            }}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingSellers;
