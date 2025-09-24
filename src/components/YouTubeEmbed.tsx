'use client'

import { useState, useEffect } from 'react'

interface YouTubeEmbedProps {
  videoId?: string
  isLive?: boolean
  title?: string
  className?: string
}

export default function YouTubeEmbed({ 
  videoId, 
  isLive = false, 
  title = "Ukiah United Methodist Church Live Stream",
  className = ""
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Default to a placeholder or channel if no specific video
  const embedId = videoId || 'live_stream'
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/live_stream?channel=UCYourChannelId&autoplay=1&rel=0&modestbranding=1`

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [videoId])

  return (
    <div className={`relative w-full ${className}`}>
      {/* Live Indicator */}
      {isLive && (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          LIVE
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600">Loading stream...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-center p-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Stream Unavailable</h3>
            <p className="text-gray-600">Unable to load the live stream at this time.</p>
          </div>
        </div>
      )}

      {/* YouTube Embed */}
      <iframe
        className={`w-full aspect-video rounded-lg ${isLoaded ? 'block' : 'hidden'}`}
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}