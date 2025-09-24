interface WelcomingStatementProps {
  title: string
  content: string
}

export default function WelcomingStatement({ title, content }: WelcomingStatementProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
        <p className="text-gray-700 leading-relaxed font-medium">{content}</p>
      </div>
    </div>
  )
}