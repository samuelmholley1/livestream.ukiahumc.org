interface AsteriskedItemProps {
  title: string
  hymnTitle: string
  number: string
  source: string
}

export default function AsteriskedItem({ title, hymnTitle, number, source }: AsteriskedItemProps) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold uppercase mb-2 text-gray-800">{title}</h3>
      <div className="flex justify-between items-baseline bg-gray-50 p-4 rounded-lg">
        <p className="text-lg italic text-gray-800">
          &ldquo;{hymnTitle}&rdquo;
        </p>
        <p className="text-md font-semibold text-gray-700">
          {number} {source}
        </p>
      </div>
    </div>
  )
}