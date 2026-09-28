import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/foodpartner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    },[id])

    return (
        <>
            <style>{`
        .profile-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 32px 18px;
        }

        .profile-shell {
          width: min(100%, 760px);
          background: var(--surface-strong);
          border: 2px solid var(--border);
          border-radius: 28px;
          padding: 24px 22px 18px;
          box-shadow: var(--shadow);
        }

        .profile-header {
          display: grid;
          grid-template-columns: minmax(160px, 260px) minmax(0, 1fr);
          gap: 22px;
          align-items: center;
        }

        .profile-avatar {
          width: min(100%, 220px);
          aspect-ratio: 1;
          object-fit: cover;
          margin: 0 auto;
          border-radius: 50%;
          border: 4px solid var(--border);
          background: var(--surface-muted);
          box-shadow: inset 0 0 0 18px rgba(255, 255, 255, 0.02);
        }

        .profile-fields {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-right: 10px;
        }

        .profile-field {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 62px;
          padding: 14px 18px;
          background: var(--surface-muted);
          border: 2px solid var(--border);
          border-radius: 14px;
          font-size: clamp(1.2rem, 2vw, 2rem);
          font-weight: 600;
          color: var(--text);
          text-align: center;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 110px;
          text-align: center;
          color: var(--text);
        }

        .stat-box span {
          font-size: clamp(1.2rem, 2vw, 2.1rem);
          font-weight: 500;
        }

        .stat-box strong {
          font-size: clamp(1.5rem, 2.7vw, 2.8rem);
          font-weight: 700;
        }

        .video-grid {
          margin-top: 22px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border: 2px solid var(--border);
          overflow: hidden;
          border-radius: 16px;
          background: var(--primary-soft);
        }

        .video-card {
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(76, 175, 109, 0.2);
          border: 2px solid var(--border);
          color: var(--text);
          font-size: clamp(1.2rem, 1.9vw, 2rem);
          text-transform: lowercase;
        }

        @media (max-width: 640px) {
          .profile-header {
            grid-template-columns: 1fr;
          }

          .profile-avatar {
            width: min(100%, 200px);
          }

          .profile-fields {
            padding-right: 0;
          }

          .video-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

            <div className="profile-page">
                <div className="profile-shell">
                    <div className="profile-header">
                        <img className="profile-avatar" src="https://www.moinsheikh.in/cropped_circle_image.webp" alt="" />

                        <div className="profile-fields">
                            <div className="profile-field">{profile?.restaurantName}</div>
                            <div className="profile-field">{profile?.address}</div>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-box">
                            <span>Total Meals</span>
                            <strong>{profile?.totalMeals}</strong>
                        </div>

                        <div className="stat-box">
                            <span>Customers Served</span>
                            <strong>{profile?.customersServed}</strong>
                        </div>
                    </div>

                    <div className="video-grid">
                        {videos?.map((video, index) => (
                            <div key={index} >
                                <video style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={video.video} muted ></video>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile