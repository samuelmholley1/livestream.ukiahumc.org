'use client'

import { useState, useEffect } from 'react'
import { format, isWithinInterval, setHours, setMinutes, setSeconds } from 'date-fns'
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

  // Check if it's service time (9:55am-11:30am PT on Sundays)
  useEffect(() => {
    const checkServiceTime = () => {
      try {
        const now = new Date()
        const pacificTime = toZonedTime(now, 'America/Los_Angeles')
        const dayOfWeek = pacificTime.getDay()
        
        // Only Sunday (0)
        if (dayOfWeek !== 0) {
          setIsServiceTime(false)
          return
        }

        // Set service window: 9:55am - 11:30am PT
        const serviceStart = setSeconds(setMinutes(setHours(pacificTime, 9), 55), 0)
        const serviceEnd = setSeconds(setMinutes(setHours(pacificTime, 11), 30), 0)

        const isTime = isWithinInterval(pacificTime, {
          start: serviceStart,
          end: serviceEnd,
        })

        setIsServiceTime(isTime)
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
    if (!isServiceTime || !isPasswordCorrect) return

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
  }, [isServiceTime, isPasswordCorrect])

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

  // Not service time
  if (!isServiceTime) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Prayer Requests & Messages
        </h3>
        <p className="text-gray-700 mb-2">
          The comment box is open during Sunday worship service (9:55 AM - 11:30 AM Pacific Time)
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

  // Service time but password not entered
  if (!isPasswordCorrect) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prayer Requests & Messages
        </h3>
        <p className="text-gray-600 mb-4">
          Share your prayer requests and messages during the service
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
            Access Comments
          </button>
        </form>
      </div>
    )
  }

  // Service time and password correct - show comment form and comments
  return (
    <div className="space-y-6">
      {/* Submit Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Share Prayer Request or Message
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

      {/* Comments Display */}
      {comments.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Messages ({comments.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {comment.firstName.charAt(0)}{comment.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-semibold text-gray-900">
                        {comment.firstName} {comment.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.timestamp), 'h:mm a')}
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
        </div>
      )}
    </div>
  )
}
