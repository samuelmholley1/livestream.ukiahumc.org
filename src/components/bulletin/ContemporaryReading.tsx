interface ContemporaryReadingProps {
  title: string
  poemTitle: string
  author: string
  content: string[]
}

export default function ContemporaryReading({ title, poemTitle, author, content }: ContemporaryReadingProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-green-800">&ldquo;{poemTitle}&rdquo;</h4>
        <p className="text-md text-gray-600 mb-4 italic">by {author}</p>
        <div className="space-y-2">
          {content.map((line, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}