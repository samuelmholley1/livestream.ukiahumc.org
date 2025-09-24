interface ThresholdMomentProps {
  title: string
  content: Array<{
    speaker: string
    text: string
  }>
}

export default function ThresholdMoment({ title, content }: ThresholdMomentProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="space-y-4">
          {content.map((item, index) => (
            <div key={index} className="border-l-4 border-purple-400 pl-4">
              <p className="font-semibold text-purple-800 mb-2">{item.speaker}:</p>
              <p className="text-gray-700 leading-relaxed italic">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}