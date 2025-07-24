import React from "react";

function SidePanel({ data, onClose, loading, resources }) {
  return (
    <div className={`side-panel ${data || loading ? "side-panel-open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : data ? (
        <div className="container">
          <h2 className="country-name">{data.name}</h2>
          <img className="country-flag" src={data.flag} alt="Flag" />
          <ul>
            <li><strong>Capital:</strong> <span className="city">{data.capital}</span></li>
            <li><strong>Area:</strong> <span className="area" dangerouslySetInnerHTML={{ __html: data.area }} /></li>
            <li>
              <strong>Currency:</strong>
              <ul className="currency">
                {data.currency.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </li>
            <li>
              <strong>Languages:</strong>
              <ul className="languages">
                {data.languages.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </li>
          </ul>

          {!loading && resources && (
            <div className="resources-section">
              <h3>Humanitarian Resources</h3>
              {resources.length > 0 ? (
                <ul className="resources-list">
                  {resources.map((res) => (
                    <li key={res._id} className="resource-item">
                      <strong>{res.name}</strong> ({res.category})<br />
                      <a href={res.url} target="_blank" rel="noopener noreferrer">
                        {res.url}
                      </a>
                      {res.description && <p>{res.description}</p>}
                      {res.language?.length > 0 && (
                        <p><strong>Languages:</strong> {res.language.join(", ")}</p>
                      )}
                      {res.verified && <p style={{ color: "green" }}><em>✓ Verified</em></p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No humanitarian resources found for this country.</p>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SidePanel;
