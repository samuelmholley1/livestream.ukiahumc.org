interface ScriptureReadingProps {
  title: string
  reference: string
  version: string
  content: string[]
}

export default function ScriptureReading({ title, reference, version, content }: ScriptureReadingProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-blue-800">{reference}</h4>
        <p className="text-sm text-gray-500 mb-4 italic">{version}</p>
        <div className="prose max-w-none">
          {content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}