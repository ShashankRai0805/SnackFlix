import React, { useEffect, useState } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [showRawData, setShowRawData] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Full response:", response);
        setResponseData(response.data);
        setProfile(response.data.foodPartner);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setResponseData({ error: error.message });
      });
  }, [id]);

  return (
    <div className="profile-wrap">
      {/* Toggle button to show/hide raw response data */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowRawData(!showRawData)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showRawData ? 'Hide' : 'Show'} API Response Data
        </button>
      </div>

      {/* Display raw response data */}
      {showRawData && responseData && (
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          fontFamily: 'monospace',
          fontSize: '14px',
          maxHeight: '400px',
          overflow: 'auto',
          border: '1px solid #d1d5db'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>Raw API Response:</h3>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}

      <section className="profile-header">
        <div className="avatar" aria-hidden="true" />
        <div className="header-right">
          <div className="pills">
            <span className="pill name">{profile?.name || "Business name"}</span>
            <span className="pill address">{profile?.address || "No address"}</span>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-label">Total meals</div>
              <div className="stat-value">{profile?.totalMeals || 0}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Customers served</div>
              <div className="stat-value">{profile?.customersServed || "N/A"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        {profile?.videos && profile.videos.length > 0 ? (
          profile.videos.map((vid, i) => (
            <div key={i} className="card">
              <video src={vid} controls className="gallery-video" />
            </div>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
