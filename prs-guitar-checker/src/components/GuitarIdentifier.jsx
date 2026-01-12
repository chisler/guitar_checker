import { useState } from 'react';
import { identifyPRS } from '../utils/prsIdentifier';
import { SET_NECK_STANDARD_MODELS } from '../utils/prsModels';
import './GuitarIdentifier.css';

const EXAMPLE_SERIALS = [
  { serial: '10166759', label: 'Set-Neck (2010)' },
  { serial: '23s2067156', label: 'S2 Series (2023)' },
  { serial: 'S2000001', label: 'S2 Series (2013)' },
  { serial: 'CE12345', label: 'CE Model' },
  { serial: 'A1234', label: 'Acoustic' },
  { serial: 'K12345', label: 'SE Korea (2010)' },
];

function GuitarIdentifier() {
  const [serialNumber, setSerialNumber] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Small delay for better UX
    setTimeout(() => {
      const identification = identifyPRS(serialNumber);
      setResult(identification);
      setIsLoading(false);
    }, 100);
  };

  const handleClear = () => {
    setSerialNumber('');
    setResult(null);
  };

  const handleExampleClick = (serial) => {
    setSerialNumber(serial);
    setIsLoading(true);
    setTimeout(() => {
      const identification = identifyPRS(serial);
      setResult(identification);
      setIsLoading(false);
    }, 100);
  };

  return (
    <div className="guitar-identifier">
      <div className="identifier-container">
        <header className="identifier-header">
          <h1>PRS Guitar Year Identifier</h1>
          <p className="subtitle">
            Identify your PRS guitar's model and year from its serial number
          </p>
          <a 
            href="https://support.prsguitars.com/hc/en-us/articles/4408314427547-Year-Identification" 
            target="_blank" 
            rel="noopener noreferrer"
            className="guide-link"
          >
            📖 View Official PRS Guide
          </a>
        </header>

        <form onSubmit={handleSubmit} className="identifier-form">
          <div className="input-group">
            <label htmlFor="serial-number">
              Enter Serial Number:
            </label>
            <input
              id="serial-number"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g., 10166759, 23s2067156, S2000001..."
              className="serial-input"
              autoFocus
            />
          </div>
          
          <div className="button-group">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!serialNumber.trim() || isLoading}
            >
              {isLoading ? 'Identifying...' : 'Identify Guitar'}
            </button>
            {result && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>

          <div className="examples-section">
            <span className="examples-label">Try examples:</span>
            <div className="examples-buttons">
              {EXAMPLE_SERIALS.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="example-btn"
                  onClick={() => handleExampleClick(example.serial)}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </form>

        {result && (
          <div className="result-container">
            {result.error ? (
              <div className="result-error">
                <h2>❌ Identification Failed</h2>
                <p>{result.error}</p>
                {result.suggestions && (
                  <ul className="suggestions">
                    {result.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="result-success">
                <h2>✅ Identification Results</h2>
                {result.results.map((item, idx) => (
                  <div key={idx} className="result-item">
                    <div className="result-header">
                      <h3>{item.model}</h3>
                      <span className={`confidence-badge confidence-${item.confidence}`}>
                        {item.confidence === 'high' ? '✓ High' : 
                         item.confidence === 'medium' ? '~ Medium' : '? Low'}
                      </span>
                    </div>
                    
                    <div className="result-details">
                      {item.year ? (
                        <div className="detail-row">
                          <span className="detail-label">Year:</span>
                          <span className="detail-value year-value">{item.year}</span>
                        </div>
                      ) : item.possibleYears ? (
                        <div className="detail-row">
                          <span className="detail-label">Possible Years:</span>
                          <span className="detail-value">
                            {item.possibleYears.join(', ')}
                          </span>
                        </div>
                      ) : null}
                      
                      <div className="detail-row">
                        <span className="detail-label">Serial Location:</span>
                        <span className="detail-value">{item.location}</span>
                      </div>
                      
                      {item.breakdown && (
                        <div className="breakdown-section">
                          <h4 className="breakdown-title">Serial Number Breakdown</h4>
                          <div className="breakdown-content">
                            <div className="breakdown-visual">
                              <span className="breakdown-part breakdown-prefix">
                                {item.breakdown.yearPrefix}
                              </span>
                              <span className="breakdown-separator">+</span>
                              <span className="breakdown-part breakdown-sequential">
                                {item.breakdown.sequentialNumber.toLocaleString()}
                              </span>
                              <span className="breakdown-equals">=</span>
                              <span className="breakdown-full">{item.breakdown.fullSerial}</span>
                            </div>
                            <div className="breakdown-explanation">
                              {item.breakdown.explanation}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {item.breakdown?.showModels && (
                        <div className="models-section">
                          <h4 className="models-title">Possible Models</h4>
                          <p className="models-subtitle">
                            Your serial number could be any of these Set-Neck (Standard) models. Check your guitar's features to identify the exact model.
                          </p>
                          <div className="models-list">
                            {SET_NECK_STANDARD_MODELS.map((model, idx) => (
                              <div key={idx} className="model-item">
                                <div className="model-content">
                                  <span className="model-name">{model.name}</span>
                                  <span className="model-description">{model.description}</span>
                                </div>
                                <a
                                  href={model.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="model-link"
                                >
                                  View →
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {item.note && (
                        <div className="detail-note">
                          <strong>Note:</strong> {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button 
          className="info-toggle"
          onClick={() => setShowInfo(!showInfo)}
          type="button"
        >
          <span>How to Use</span>
          <span className={`arrow ${showInfo ? 'open' : ''}`}>▼</span>
        </button>
        {showInfo && (
          <div className="info-section">
            <ul>
              <li>Enter the complete serial number from your PRS guitar</li>
              <li>Serial numbers can be found on the back of the headstock, neck plate, or inside the sound hole (for acoustics)</li>
              <li>The identifier supports all PRS models including Standard, CE, SE, S2, Acoustic, and Bass models</li>
              <li>If multiple matches are found, check the serial number location to determine the correct model</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuitarIdentifier;
