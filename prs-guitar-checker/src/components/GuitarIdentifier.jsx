import { useState } from 'react';
import { identifyPRS } from '../utils/prsIdentifier';
import { SET_NECK_STANDARD_MODELS } from '../utils/prsModels';
import { getModelLink } from '../utils/prsModelLinks';
import './GuitarIdentifier.css';

const EXAMPLE_SERIALS = [
  // Set-Neck Models
  { serial: '09156989', label: 'Set-Neck (2009)' },
  { serial: '10166759', label: 'Set-Neck (2010)' },
  { serial: '240380134', label: 'Set-Neck (2024)' },
  { serial: '08140528', label: 'Set-Neck (2008)' },
  { serial: '09151231', label: 'Set-Neck (2009)' },
  { serial: '500200', label: 'Set-Neck (1985)' },
  { serial: '836800', label: 'Set-Neck (1998)' },
  
  // S2 Series
  { serial: '23s2067156', label: 'S2 Series (2023)' },
  { serial: 'S2000001', label: 'S2 Series (2013)' },
  { serial: 'S2045000', label: 'S2 Series (2020)' },
  
  // CE Models
  { serial: 'CE19581', label: 'CE Model (1999)' },
  { serial: '70050', label: 'CE Model (1988)' },
  { serial: '170001', label: 'CE Model (2017)' },
  
  // SE Models
  { serial: 'K12345', label: 'SE Korea (2010)' },
  { serial: 'CTIG097014', label: 'SE Indonesia (2024)' },
  { serial: 'CTIA12345', label: 'SE Indonesia (2018)' },
  
  // Acoustic
  { serial: 'A150001', label: 'Acoustic (2015)' },
  { serial: 'A120001', label: 'Acoustic (2012)' },
  
  // Other Models
  { serial: 'SA00500', label: 'Swamp Ash Special (1998)' },
  { serial: 'EB00300', label: 'Electric Bass (2002)' },
  { serial: 'AMP090500', label: 'Amplifier (2009)' },
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
          <h1>PRS Guitar Identifier</h1>
          <p className="subtitle">
            Not sure if you need this? If you do, here we go. Enter your serial number below to identify your PRS guitar's model and year.
          </p>
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
                <div className="error-contact">
                  <p className="error-contact-text">
                    Found a mistake or want to help improve this?{' '}
                    <a href="mailto:alexander.chisler@gmail.com" className="error-contact-link">
                      Email me
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="result-success">
                <h2>✅ Here's What We Found</h2>
                {result.results.map((item, idx) => (
                  <div key={idx} className="result-item">
                    <div className="result-header">
                      <div className="result-title-group">
                        <h3>{item.model}</h3>
                        {getModelLink(item.model) && (
                          <a
                            href={getModelLink(item.model)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="model-website-link"
                          >
                            View on PRS.com →
                          </a>
                        )}
                      </div>
                      <span className={`confidence-badge confidence-${item.confidence}`}>
                        {item.confidence === 'high' ? '✓ Verified' : 
                         item.confidence === 'medium' ? '~ Likely' : '? Uncertain'}
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
                          <h4 className="models-title">Which Model Is It?</h4>
                          <p className="models-subtitle">
                            Your serial number could be any of these models. Check your guitar's features (pickups, headstock shape, etc.) to figure out which one.
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
          <span>How to Use & Official Guide</span>
          <span className={`arrow ${showInfo ? 'open' : ''}`}>▼</span>
        </button>
        {showInfo && (
          <div className="info-section">
            <div className="info-content">
              <h4>How to Use</h4>
              <ul>
                <li>Enter your PRS guitar's serial number</li>
                <li>Serial numbers are usually on the back of the headstock, neck plate, or inside the sound hole (acoustics)</li>
                <li>Works with all PRS models: Standard, CE, SE, S2, Acoustic, Bass, and more</li>
              </ul>
              
              <h4>Official PRS Guide</h4>
              <p className="official-guide-note">
                This tool is based on the official PRS identification guide. For the most accurate and up-to-date information, check the source:
              </p>
              <a 
                href="https://support.prsguitars.com/hc/en-us/articles/4408314427547-Year-Identification" 
                target="_blank" 
                rel="noopener noreferrer"
                className="official-guide-link"
              >
                📖 Official PRS Year Identification Guide →
              </a>
            </div>
          </div>
        )}

        <div className="contact-section">
          <p className="contact-text">
            Found a mistake or want to help improve this?{' '}
            <a href="mailto:alexander.chisler@gmail.com" className="contact-link">
              Email me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuitarIdentifier;
