import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qrcode from "./images/qr.jpg"
const Payment = () => {
    const [showCard, setShowCard] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCardPayment = () => {
        setShowCard(true);
        setShowQR(false);
        setReceipt(null);
    };

    const handleQRPayment = () => {
        setShowQR(true);
        setShowCard(false);
        setReceipt(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const receiptData = {
            cardholderName: formData.get('cardholder-name'),
            cardNumber: formData.get('card-number'),
            expiryDate: formData.get('expiry-date'),
            cvv: formData.get('cvv'),
            amount: formData.get('amount'),
        };
        setReceipt(receiptData);
    };

    return (
        <div className="container">
            <style>
            {`
                {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    background: linear-gradient(135deg, #e0eafc, #cfdef3);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    transition: background 0.6s ease;
}

.container {
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 {
    font-size: 2.5rem;
    color: #3d5afe;
    margin-bottom: 20px;
    transition: color 0.3s ease;
}

h1:hover {
    color: #1e88e5;
}

.payment-method {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

button {
    padding: 12px 24px;
    font-size: 1rem;
    background-color: #1e88e5;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.4s ease, transform 0.2s ease;
}

button:hover {
    background-color: #3d5afe;
    transform: translateY(-2px);
}

.back-button {
    margin-top: 20px;
    background-color: #757575;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
    background-color: #616161;
    transform: translateY(-2px);
}

.payment-form {
    background-color: #e3f2fd;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    animation: slideIn 0.8s ease-in-out;
}

@keyframes slideIn {
    from { transform: translateX(-100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

label {
    display: block;
    margin: 10px 0 5px;
    font-weight: bold;
    color: #555;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s ease, background-color 0.3s ease;
}

input[type="text"]:focus {
    border-color: #1e88e5;
    background-color: #f1f8ff;
}

img {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    transition: transform 0.4s ease;
}

img:hover {
    transform: scale(1.1);
}

#receipt {
    background-color: #c8e6c9;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: left;
    animation: fadeIn 1s ease-in-out;
}

#receipt h2 {
    color: #2e7d32;
    font-size: 1.5rem;
}

#receipt p {
    font-size: 1rem;
    color: #333;
    margin: 5px 0;
}

#receipt button {
    background-color: #4CAF50;
    margin-top: 10px;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

#receipt button:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
}
                
            `}        
            </style>
            <h1>Payment</h1>
            <div className="payment-method">
                <button onClick={handleCardPayment}>Card Payment</button>
                <button onClick={handleQRPayment}>QR Code Payment</button>
            </div>
            <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Added Back button */}
            {showCard && (
                <div className="payment-form">
                    <form id="card-form" onSubmit={handleSubmit}>
                        <label htmlFor="cardholder-name">Cardholder Name</label>
                        <input type="text" id="cardholder-name" name="cardholder-name" required />

                        <label htmlFor="card-number">Card Number</label>
                        <input type="text" id="card-number" name="card-number" required />

                        <label htmlFor="expiry-date">Expiry Date</label>
                        <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required />

                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" required />
                        
                        <label htmlFor="Amount">Amount</label>
                        <input type="text" id="Amount" name="Amount" required />

                        <button type="submit">Pay Now</button>
                    </form>
                </div>
            )}
            {showQR && (
                <div className="payment-form">
                    <p>Scan the QR code to make a payment:</p>
                    <img src={qrcode} alt="QR Code" />
                </div>
            )}
            {receipt && (
                <div id="receipt">
                    <h2>Payment Receipt</h2>
                    <p><strong>Cardholder Name:</strong> {receipt.cardholderName}</p>
                    <p><strong>Card Number:</strong> {receipt.cardNumber}</p>
                    <p><strong>Expiry Date:</strong> {receipt.expiryDate}</p>
                    <p><strong>CVV:</strong> {receipt.cvv}</p>
                    <p><strong>Amount:</strong> {receipt.Amount}</p>
                    <button onClick={() => window.print()}>Print Receipt</button>
                </div>
            )}
        </div>
    );
};

export default Payment;