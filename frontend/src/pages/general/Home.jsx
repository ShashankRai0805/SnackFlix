import React, { useState, useEffect, useRef } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]); // store refs to all video elements

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setVideos(res.data.foodItems || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  // Play only the video currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 } // 60% of video must be visible
    );

    // Snapshot current refs to avoid cleanup using a mutated ref array
    const currentVideos = videoRefs.current.filter(Boolean);
    currentVideos.forEach((video) => observer.observe(video));

    return () => {
      currentVideos.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, [videos]);

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`/food-partner/${id}`);
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="reels">
        <section className="reel" aria-busy="true" aria-live="polite">
          <div className="overlay">
            <p className="description">Discover great food near you. Videos will appear here as they load.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="reels">
      {videos.map((v, idx) => (
        <section className="reel" key={v._id}>
          <video
            ref={(el) => (videoRefs.current[idx] = el)} // store reference
            src={v.video}
            className="media"
            muted
            playsInline
            loop
            preload="metadata"
          />
          <div className="overlay">
            <p className="description">{v.description}</p>
            <button
              className="visit-btn"
              onClick={(e) => handleClick(e, v._id)}
            >
              Visit store
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
