'use client'

import { useState, useEffect } from 'react'
import { format, getDay, getHours, getMinutes } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

interface Comment {
  id: string
  firstName: string
  lastName: string
  message: string
  timestamp: string
}

export default function PrayerComments() {
  const [isServiceTime, setIsServiceTime] = useState(false)
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Check if it's service time (9:00am-1:00pm PT on Sundays)
  useEffect(() => {
    const checkServiceTime = () => {
      try {
        const now = new Date()
        const pacificTime = toZonedTime(now, 'America/Los_Angeles')
        const day = getDay(pacificTime)
        const hour = getHours(pacificTime)
        const minute = getMinutes(pacificTime)
        
        // Sunday = 0, check if between 9:00am and 1:00pm PT
        if (day !== 0) {
          setIsServiceTime(false)
          return
        }
        
        const currentMinutes = hour * 60 + minute
        const startMinutes = 9 * 60 + 0   // 9:00am
        const endMinutes = 13 * 60 + 0    // 1:00pm
        
        setIsServiceTime(currentMinutes >= startMinutes && currentMinutes <= endMinutes)
      } catch (error) {
        console.error('Error checking service time:', error)
        setIsServiceTime(false)
      }
    }

    checkServiceTime()
    const interval = setInterval(checkServiceTime, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Fetch comments every 5 seconds during service time
  useEffect(() => {
    if (!isServiceTime) return

    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments')
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments || [])
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
    const interval = setInterval(fetchComments, 5000) // Auto-refresh every 5 seconds

    return () => clearInterval(interval)
  }, [isServiceTime])

  // Auto-cleanup comments 24 hours after service ends (Monday 1:00pm PT)
  useEffect(() => {
    const checkAndCleanup = async () => {
      try {
        const now = new Date()
        const pacificTime = toZonedTime(now, 'America/Los_Angeles')
        const day = getDay(pacificTime)
        const hour = getHours(pacificTime)
        const minute = getMinutes(pacificTime)
        
        // Only run on Monday (1) at exactly 1:00pm PT (24 hours after Sunday service ends)
        if (day === 1 && hour === 13 && minute === 0) {
          console.log('Triggering comment cleanup at Monday 1:00pm PT (24 hours after service)')
          const response = await fetch('/api/comments', { method: 'DELETE' })
          if (response.ok) {
            const data = await response.json()
            console.log(`Cleanup complete: ${data.deletedCount} comments deleted`)
            // Refresh comments to show only pinned comment remains
            const refreshResponse = await fetch('/api/comments')
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json()
              setComments(refreshData.comments || [])
            }
          }
        }
      } catch (error) {
        console.error('Error during auto-cleanup:', error)
      }
    }

    // Check every minute for the 11:30am cleanup time
    const interval = setInterval(checkAndCleanup, 60000)
    checkAndCleanup() // Also check immediately on mount

    return () => clearInterval(interval)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'lovewins') {
      setIsPasswordCorrect(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          message,
          password: 'lovewins', // Already validated
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFirstName('')
        setLastName('')
        setMessage('')
        // Fetch comments immediately to show new one
        const commentsResponse = await fetch('/api/comments')
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json()
          setComments(commentsData.comments || [])
        }
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(data.error || 'Failed to submit comment')
      }
    } catch (error) {
      setError('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterCount = message.length
  const characterLimit = 500

  // Not service time - show closed message
  if (!isServiceTime) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Service Messages
        </h3>
        <p className="text-gray-700 mb-2">
          The message box is open during Sunday worship service (9:00 AM - 1:00 PM Pacific Time)
        </p>
        <p className="text-gray-600 text-sm">
          Outside of service hours, please email announcements to{' '}
          <a href="mailto:office@ukiahumc.org" className="text-blue-600 hover:underline font-semibold">
            office@ukiahumc.org
          </a>{' '}
          by Wednesday
        </p>
      </div>
    )
  }

  // Service time - show comments to everyone, but require password to submit
  return (
    <div className="space-y-6">
      {/* Comments Display - Always visible during service time */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          Service Messages
        </h3>
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No messages yet. Be the first to share!
          </p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden bg-white border border-gray-200">
                    <img 
                      src="/favicon-32x32.png" 
                      alt="Church Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-semibold text-gray-900">
                        {comment.firstName} {comment.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(toZonedTime(new Date(comment.timestamp), 'America/Los_Angeles'), 'h:mm a')}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1 whitespace-pre-wrap break-words">
                      {comment.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Form - Password Protected */}
      {!isPasswordCorrect ? (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Share a Message
          </h3>
          <p className="text-gray-600 mb-4">
            Enter the password to submit a message during the service
          </p>
          <p className="text-sm text-blue-600 mb-4">
            💡 Hint: The password is the same as our WiFi password (found in the bulletin)
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Unlock Comment Form
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Share a Message
          </h3>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              maxLength={characterLimit}
              required
            />
            <div className="text-right mt-1">
              <span className={`text-sm ${characterCount > 450 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                {characterCount}/{characterLimit} characters
              </span>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Message submitted successfully!
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Message'}
          </button>
        </form>
      </div>
      )}
    </div>
  )
}
