import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidePanel.css";

function SidePanel({ data, onClose, loading, resources }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (data?.name) {
      navigate(`/country/${encodeURIComponent(data.name)}`);
    }
  };

  return (
    <div className={`side-panel ${data || loading ? "side-panel-open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>

      {loading ? (
        <div className="loading">loading...</div>
      ) : data ? (
        <div className="container">
          <h2 className="country-name">{data.name}</h2>
          <img className="country-flag" src={data.flag} alt={`${data.name} Flag`} />

          {!loading && resources && (
            <div className="resources-section">
              <h3>humanitarian resources</h3>
              {resources.length > 0 ? (
                <>
                  <ul className="resources-list">
                    {resources.map((res) => (
                      <li key={res._id} className="resource-item">
                        <strong>{res.name}</strong> ({res.category})<br />
                        <a href={res.url} target="_blank" rel="noopener noreferrer">
                          {res.url}
                        </a>
                        {res.description && <p>{res.description}</p>}
                        {res.language?.length > 0 && (
                          <p><strong>languages:</strong> {res.language.join(", ")}</p>
                        )}
                        {res.verified && <p className="verified"><em>verified</em></p>}
                      </li>
                    ))}
                  </ul>
                  <button className="view-more-btn" onClick={handleViewMore}>view more</button>
                </>
              ) : (
                <p>sorry, i am still working on adding resources to this country!</p>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SidePanel;
