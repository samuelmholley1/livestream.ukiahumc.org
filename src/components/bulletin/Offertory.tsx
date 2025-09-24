interface OffertoryProps {
  title: string
  song: string
  artist: string
  offeringNote: string
}

export default function Offertory({ title, song, artist, offeringNote }: OffertoryProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-yellow-800 mb-1">{song}</h4>
          <p className="text-yellow-700 italic">by {artist}</p>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 text-center">{offeringNote}</p>
        </div>
      </div>
    </div>
  )
}