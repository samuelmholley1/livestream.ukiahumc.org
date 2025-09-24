interface MessageProps {
  title: string
  messageTitle: string
  speaker: string
}

export default function Message({ title, messageTitle, speaker }: MessageProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-red-800 mb-2">{messageTitle}</h4>
        <p className="text-red-700">Speaker: {speaker}</p>
      </div>
    </div>
  )
}