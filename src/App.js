import React, { useState } from 'react';
import './App.css';
import LoadingSpinner from './LoadingSpinner';

function App() {
  const [recommendations, setRecommendations] = useState('');
  const [hasClickedRecommend, setHasClickedRecommend] = useState(false);

  const [marketSector, setMarketSector] = useState('Choose One');
  const [holdingPeriod, setHoldingPeriod] = useState('Choose One');
  const [maxPrice, setMaxPrice] = useState(500);
  const [riskLevel, setRiskLevel] = useState('Choose One');

  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://aistockadvisor-api.onrender.com', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          marketSector: marketSector,
          holdingPeriod: holdingPeriod,
          maxPrice: maxPrice,
          riskLevel: riskLevel
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
        setHasClickedRecommend(true);
      } else {
        console.error('Failed to retrieve recommendations');
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setIsLoading(false);
    }
  };

  const renderRecommendations = () => {
    if (recommendations) {
      const paragraphs = recommendations.split('\n\n');
      return paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <img className="app-logo"
        src={require('./images/stock-exchange-market-with-chart-png.png')}
        alt="Your Image Alt Text"
      />
        <h1>AI Stock Advisor</h1>
        <form onSubmit={e => e.preventDefault()}></form>
        <div>
        <p>Market Sector</p>
          <select
            id="market-sector"
            value={marketSector}
            onChange={(e) => setMarketSector(e.target.value)}
            className="custom-dropdown"
          >
            <option value="default">Choose One</option>
            <option value="healthcare">Healthcare</option>
            <option value="materials">Materials</option>
            <option value="real-estate">Real Estate</option>
            <option value="consumer-staples">Consumer Staples</option>
            <option value="consumer-discretionary">Consumer Discretionary</option>
            <option value="utilities">Utilities</option>
            <option value="energy">Energy</option>
            <option value="industrials">Industrials</option>
            <option value="consumer-services">Consumer Services</option>
            <option value="financials">Financials</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div>
          <p>Holding Period in Years</p>
          <select
            id="holding-period"
            value={holdingPeriod}
            onChange={(e) => setHoldingPeriod(e.target.value)}
            className="custom-dropdown"
          >
            <option value="default">Choose One</option>
            <option value="<1">Less than 1 year</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="2">5 years</option>
            <option value="3">6 years</option>
            <option value="4">7 years</option>
            <option value="2">8 years</option>
            <option value="3">9 years</option>
            <option value="4">10+ years</option>
          </select>
        </div>
        <div>
          <p>Risk Level</p>
          <select
            id="risk-level"
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="custom-dropdown"
          >
            <option value="Choose">Choose One</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <p>Max Price:</p>
          <input
            type="range"
            id="max-price"
            name="max-price"
            min="1"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
          />
          <p>${maxPrice}</p>
        </div>
        <button className="submit-button" onClick={handleSubmit}>Get Recommendations</button>
        
        {isLoading && <LoadingSpinner />} {/* Show loading spinner when loading */}

        {hasClickedRecommend && (
          <div>
            <h4>Your personalized recommendations:</h4>
            <h6 className="output">{renderRecommendations()}</h6>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;