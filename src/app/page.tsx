'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import LiveStreamStatus from '@/components/LiveStreamStatus'
import ServiceScheduleDisplay from '@/components/ServiceScheduleDisplay'
import { ServiceSchedule } from '@/types/livestream'

const serviceSchedule: ServiceSchedule[] = [
  {
    day: 'Sunday',
    time: '10:30 AM',
    service: 'Traditional Worship',
    description: 'Join us for traditional worship with hymns, scripture, and message'
  },
  {
    day: 'Wednesday',
    time: '7:00 PM',
    service: 'Bible Study',
    description: 'Midweek Bible study and fellowship'
  }
]

export default function Home() {
  const [isLive, setIsLive] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string>()

  // In production, this would check YouTube API for live status
  useEffect(() => {
    // Simulate checking for live stream
    // Replace with actual YouTube API integration
    const checkLiveStatus = () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const hour = now.getHours()
      const minute = now.getMinutes()
      
      // Sunday service time (10:30 AM - 11:30 AM)
      const isSundayService = dayOfWeek === 0 && 
        ((hour === 10 && minute >= 30) || hour === 11)
      
      // Wednesday Bible study (7:00 PM - 8:00 PM)
      const isWednesdayStudy = dayOfWeek === 3 && hour === 19
      
      setIsLive(isSundayService || isWednesdayStudy)
    }

    checkLiveStatus()
    const interval = setInterval(checkLiveStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const nextService = {
    date: 'Sunday',
    time: '10:30 AM',
    title: 'Traditional Worship Service'
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo-for-church-larger.jpg"
              alt="Ukiah United Methodist Church Logo"
              width={200}
              height={200}
              className="mx-auto rounded-lg shadow-lg"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ukiah United Methodist Church
          </h1>
          <h2 className="text-2xl text-blue-600 mb-4">Live Stream</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us live for worship, fellowship, and spiritual growth. 
            Experience our services from anywhere in the world.
          </p>
        </header>

        {/* Live Stream Status */}
        <div className="mb-8">
          <LiveStreamStatus 
            isLive={isLive}
            nextService={!isLive ? nextService : undefined}
            viewerCount={isLive ? 47 : undefined}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Live Stream Video - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {isLive ? 'Live Now' : 'Recent Service'}
                </h3>
                {isLive && (
                  <div className="flex items-center text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-semibold">LIVE</span>
                  </div>
                )}
              </div>
              
              <YouTubeEmbed
                videoId={currentVideoId}
                isLive={isLive}
                title="Ukiah United Methodist Church Live Stream"
              />
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  Having trouble with the stream? Try refreshing the page or{' '}
                  <a href="https://youtube.com/@ukiahumc" className="text-blue-600 hover:underline">
                    visit our YouTube channel
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Service Schedule - Takes up 1 column */}
          <div className="lg:col-span-1">
            <ServiceScheduleDisplay 
              schedule={serviceSchedule}
              currentService={isLive ? serviceSchedule[0] : undefined}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-blue-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Bulletin</h3>
            <p className="text-gray-600 mb-4">View this week's order of worship and announcements</p>
            <a 
              href="/7-13-25" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Bulletin
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit In Person</h3>
            <p className="text-gray-600 mb-4">Join us for in-person worship and fellowship</p>
            <a 
              href="https://ukiahumc.org/visit" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Plan Your Visit
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-purple-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect Online</h3>
            <p className="text-gray-600 mb-4">Follow us for updates and community</p>
            <a 
              href="https://ukiahumc.org" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 border-t pt-8">
          <p className="mb-2">
            <strong>Ukiah United Methodist Church</strong>
          </p>
          <p className="mb-2">
            270 N. Pine St., Ukiah, CA 95482 | 707.462.3360 | office@ukiahumc.org
          </p>
          <p className="text-sm mb-4">
            Visit us at{' '}
            <a 
              href="https://ukiahumc.org" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ukiahumc.org
            </a>
          </p>
          <p className="text-xs text-gray-500">
            "Love God • Live Compassion" - A Welcoming & Affirming Congregation
          </p>
        </footer>
      </div>
    </main>
  )
}