import React, { createContext, useContext, useState, useEffect } from 'react'

const SavedContext = createContext()

const STORAGE_KEY_SAVED = 'food_view_saved_items'
const STORAGE_KEY_LIKES = 'food_view_likes_state'
const STORAGE_KEY_COMMENTS = 'food_view_comments_state'

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [likesState, setLikesState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LIKES)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  const [commentsState, setCommentsState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COMMENTS)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedItems))
    } catch (err) {
      console.error('Failed to sync saved items to localStorage', err)
    }
  }, [savedItems])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likesState))
    } catch (err) {
      console.error('Failed to sync likes to localStorage', err)
    }
  }, [likesState])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(commentsState))
    } catch (err) {
      console.error('Failed to sync comments to localStorage', err)
    }
  }, [commentsState])

  const getItemId = (item) => item?._id || item?.id || String(item?.src || item?.video)

  const isSaved = (item) => {
    const id = typeof item === 'object' ? getItemId(item) : item
    return savedItems.some((saved) => getItemId(saved) === id)
  }

  const toggleSave = (item) => {
    const id = getItemId(item)
    setSavedItems((prev) => {
      const exists = prev.some((saved) => getItemId(saved) === id)
      if (exists) {
        return prev.filter((saved) => getItemId(saved) !== id)
      } else {
        return [...prev, item]
      }
    })
  }

  const getLikeInfo = (itemId, defaultCount = 25) => {
    const record = likesState[itemId]
    if (record) return record
    return { isLiked: false, count: defaultCount }
  }

  const toggleLike = (itemId, defaultCount = 25) => {
    setLikesState((prev) => {
      const current = prev[itemId] || { isLiked: false, count: defaultCount }
      const isLiked = !current.isLiked
      const count = isLiked ? current.count + 1 : Math.max(0, current.count - 1)
      return {
        ...prev,
        [itemId]: { isLiked, count },
      }
    })
  }

  const getComments = (itemId) => {
    return commentsState[itemId] || [
      { id: 1, author: 'FoodieElena', text: 'This looks so delicious! Need to try ASAP 🔥', time: '2h ago' },
      { id: 2, author: 'ChefMark', text: 'The plating and colors are on point 👌', time: '5h ago' }
    ]
  }

  const addComment = (itemId, text) => {
    if (!text || !text.trim()) return
    const newComment = {
      id: Date.now(),
      author: 'You',
      text: text.trim(),
      time: 'Just now'
    }
    setCommentsState((prev) => {
      const current = prev[itemId] || [
        { id: 1, author: 'FoodieElena', text: 'This looks so delicious! Need to try ASAP 🔥', time: '2h ago' },
        { id: 2, author: 'ChefMark', text: 'The plating and colors are on point 👌', time: '5h ago' }
      ]
      return {
        ...prev,
        [itemId]: [newComment, ...current]
      }
    })
  }

  return (
    <SavedContext.Provider
      value={{
        savedItems,
        isSaved,
        toggleSave,
        getLikeInfo,
        toggleLike,
        getComments,
        addComment,
        getItemId,
      }}
    >
      {children}
    </SavedContext.Provider>
  )
}

export const useSaved = () => {
  const context = useContext(SavedContext)
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider')
  }
  return context
}
