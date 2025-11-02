'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getDay, getHours, getMinutes } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import PrayerComments from '@/components/PrayerComments'

export default function Home() {
  const [isServiceTime, setIsServiceTime] = useState(false)

  // Check if it's service time (9:00am-11:30am PT on Sundays)
  useEffect(() => {
    const checkServiceTime = () => {
      try {
        const now = new Date()
        const pacificTime = toZonedTime(now, 'America/Los_Angeles')
        const day = getDay(pacificTime)
        const hour = getHours(pacificTime)
        const minute = getMinutes(pacificTime)
        
        // Sunday = 0, check if between 9:00am and 11:30am PT
        if (day !== 0) {
          setIsServiceTime(false)
          return
        }
        
        const currentMinutes = hour * 60 + minute
        const startMinutes = 9 * 60 + 0  // 9:00am
        const endMinutes = 11 * 60 + 30   // 11:30am
        
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-10 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="mb-6">
            <Image
              src="/logo-for-church-larger.jpg"
              alt="Ukiah United Methodist Church Logo"
              width={300}
              height={300}
              className="mx-auto rounded-lg shadow-md"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ukiah United Methodist Church
          </h1>
          <h2 className="text-2xl text-blue-600 font-semibold">Live Stream</h2>
        </header>

        {/* Live Stream Video */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          {isServiceTime ? (
            <>
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Worship Service - Live Now
                </h3>
              </div>
              <YouTubeEmbed
                title="Ukiah United Methodist Church Live Stream"
                className="w-full"
              />
            </>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <Image
                  src="/uumc_icon_wall.png"
                  alt="Ukiah United Methodist Church"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg shadow-md opacity-90"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Join Us for Worship
              </h3>
              <p className="text-lg text-gray-600 mb-2">
                Sundays at 10:00 AM
              </p>
              <p className="text-gray-500 max-w-md">
                Our live stream begins at 10:00 AM Pacific Time every Sunday. 
                Come back during service time to watch!
              </p>
              <div className="mt-6 text-sm text-gray-400">
                📅 Next service: Sunday at 10:00 AM PT
              </div>
            </div>
          )}
        </div>

        {/* Prayer Comments Section */}
        <div className="mb-8">
          <PrayerComments />
        </div>

        {/* Simple Footer */}
        <footer className="text-center text-gray-600 mt-12 pt-8 border-t border-gray-200">
          <p className="mb-2">
            <strong>Ukiah United Methodist Church</strong>
          </p>
          <p className="mb-2">
            270 N. Pine St., Ukiah, CA 95482 | 707.462.3360
          </p>
          <p className="text-sm">
            <a 
              href="https://ukiahumc.org" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ukiahumc.org
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}