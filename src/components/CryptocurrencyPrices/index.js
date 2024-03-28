import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"

const CryptocurrencyPrices = () => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setPrices(response.data.bpi);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="card-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        Object.keys(prices).map(currency => (
          <div key={currency} className="card">
            <div className="card-header">{currency}</div>
            <div className="currency">{prices[currency].description}</div>
            <div className="rate">
              {prices[currency].symbol}
              {prices[currency].rate}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CryptocurrencyPrices;

