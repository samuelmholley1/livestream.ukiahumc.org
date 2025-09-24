import { ResponsiveReadingItem } from '@/types/bulletin'

interface ResponsiveReadingProps {
  title: string
  content: ResponsiveReadingItem[]
}

export default function ResponsiveReading({ title, content }: ResponsiveReadingProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
        {content.map((item, index) => (
          <p key={index} className="leading-relaxed">
            <strong className="font-semibold mr-2 text-blue-700">{item.speaker}:</strong>
            {item.isCongregation ? (
              <span className="font-bold text-gray-800">{item.text}</span>
            ) : (
              <span className="text-gray-700">{item.text}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}