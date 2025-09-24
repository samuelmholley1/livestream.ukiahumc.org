import { GoForItItem } from '@/types/bulletin'

interface GoForItProps {
  title: string
  attribution: string
  content: GoForItItem[]
}

export default function GoForIt({ title, attribution, content }: GoForItProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="space-y-2 mb-4">
          {content.map((item, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              <span className={`font-semibold mr-2 ${
                item.side === 'All' ? 'text-green-800' : 'text-green-600'
              }`}>
                {item.side}:
              </span>
              <span className={item.side === 'All' ? 'font-bold' : ''}>
                {item.text}
              </span>
            </p>
          ))}
        </div>
        <p className="text-sm text-gray-600 italic text-center">
          — {attribution}
        </p>
      </div>
    </div>
  )
}