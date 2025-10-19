import Image from 'next/image'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import PrayerComments from '@/components/PrayerComments'

export default function Home() {
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
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Worship Service
            </h3>
          </div>
          <YouTubeEmbed
            title="Ukiah United Methodist Church Live Stream"
            className="w-full"
          />
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