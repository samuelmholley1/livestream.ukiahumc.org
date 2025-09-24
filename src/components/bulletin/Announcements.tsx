interface AnnouncementsProps {
  title: string
  items: string[]
}

export default function Announcements({ title, items }: AnnouncementsProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <ul className="list-disc pl-5 space-y-3">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700 leading-relaxed">
              <span dangerouslySetInnerHTML={{ 
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}