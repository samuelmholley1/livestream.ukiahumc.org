import Link from 'next/link'

interface LiveStreamStatusProps {
  isLive: boolean
  nextService?: {
    date: string
    time: string
    title: string
  }
  viewerCount?: number
}

export default function LiveStreamStatus({ isLive, nextService, viewerCount }: LiveStreamStatusProps) {
  if (isLive) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white rounded-full mr-3 animate-pulse"></div>
            <div>
              <h2 className="text-2xl font-bold">We're Live Now!</h2>
              <p className="text-red-100">Join us for worship</p>
            </div>
          </div>
          {viewerCount && (
            <div className="text-right">
              <p className="text-sm text-red-100">Viewers</p>
              <p className="text-xl font-semibold">{viewerCount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Stream Offline</h2>
        {nextService ? (
          <div className="mb-4">
            <p className="text-blue-100 mb-2">Next Service:</p>
            <h3 className="text-xl font-semibold">{nextService.title}</h3>
            <p className="text-blue-100">
              {nextService.date} at {nextService.time}
            </p>
          </div>
        ) : (
          <p className="text-blue-100 mb-4">
            Check back during service times for live worship
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/7-13-25"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Current Bulletin
          </Link>
          <a 
            href="https://ukiahumc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </div>
  )
}