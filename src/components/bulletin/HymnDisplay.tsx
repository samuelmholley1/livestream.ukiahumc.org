interface HymnDisplayProps {
  title: string
  hymnTitle: string
  number: string
  source: string
  verse?: string
}

export default function HymnDisplay({ title, hymnTitle, number, source, verse }: HymnDisplayProps) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold uppercase mb-2 text-gray-800">{title}</h3>
      <div className="flex justify-between items-baseline bg-blue-50 p-4 rounded-lg">
        <p className="text-lg italic text-gray-800">
          &ldquo;{hymnTitle}&rdquo; {verse && <span className="text-sm font-normal">({verse})</span>}
        </p>
        <p className="text-md font-semibold text-gray-700">
          {number} {source}
        </p>
      </div>
    </div>
  )
}