import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/home-feed.css'

const videos = [
  {
    id: 1,
    src: 'https://ik.imagekit.io/z7dgkouqc/12367951_720_1280_30fps_dSl2scbDK.mp4',
    store: 'Green Leaf Kitchen',
    description:
      'Fresh ingredients, colorful plates, and a clean taste that brings together good health and big flavor.',
  },
  {
    id: 2,
    src: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
    store: 'Bamboo Bowl',
    description:
      'Crispy noodles, tender bites, and rich sauces served fresh from the kitchen for your next comfort meal.',
  },
  {
    id: 3,
    src: 'https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4',
    store: 'Saffron Street',
    description:
      'A burst of spice and flavor in every bite, made for late-night cravings and cozy food adventures.',
  },
]


const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {

    axios.get('http://localhost:4000/api/food', { withCredentials: true })
      .then(response => {
        setVideos(response.data.foodItems)
      })

  }, [])
  return (
    <div className="feed-shell">
      {videos.map((video) => (
        <div key={video._id} className="feed-slide">
          <video src={video.video} muted autoPlay loop playsInline preload="metadata" />

          <div className="feed-overlay">
            <div className="feed-meta">
              <div className="feed-store">
                <span className="dot" />
                {video.name}
              </div>

              <p className="feed-description">{video.description}</p>
            </div>

            <Link to={`/foodpartner/${video.foodPartner}`} className="feed-button">
              Visit store
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home