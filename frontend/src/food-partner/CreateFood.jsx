import React, { useState } from 'react'
import '../styles/create-food.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  
  const navigate = useNavigate()

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]

    setVideoPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview)
      }

      return file ? URL.createObjectURL(file) : ''
    })

    setVideoFile(file || null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!videoFile || !name || !description) {
      return
    }

    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('name', name)
    formData.append('description', description)

    const response = await axios.post('http://localhost:4000/api/food', formData, {
      withCredentials: true,
    })

    console.log(response.data)
    navigate('/')
  }

  const handleRemoveVideo = () => {
    setVideoFile(null)
    setVideoPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview)
      }

      return ''
    })
  }

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <header className="create-food-header">
          <span className="create-food-badge">Food Partner</span>
          <h1>Create a food</h1>
          <p>Share your latest dish with the FoodView community.</p>
        </header>

        <form className="create-food-form" onSubmit={onSubmit}>
          <div className="field-group">
            <label htmlFor="video">Food video</label>

            <div className="video-input-wrap">
              <div className="video-upload">
                <div className="video-upload-icon">▲</div>
                <div className="video-upload-meta">
                  <strong>Upload a short video</strong>
                  <span>MP4, MOV, or WebM up to 30MB</span>
                </div>
                <input id="video" type="file" accept="video/*" onChange={handleVideoChange} />
              </div>

              {videoPreview && (
                <div className="video-preview-box">
                  <video className="video-preview" src={videoPreview} controls playsInline />
                  <button
                    type="button"
                    className="remove-video-btn"
                    onClick={handleRemoveVideo}
                    aria-label="Remove selected video"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="food-name">Food name</label>
            <input
              id="food-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food name"
            />
          </div>

          <div className="field-group">
            <label htmlFor="food-description">Description</label>
            <textarea
              id="food-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people what makes this dish special..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">Publish food</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood