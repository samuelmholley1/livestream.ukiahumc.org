interface MembershipStatementProps {
  title: string
  content: string
}

export default function MembershipStatement({ title, content }: MembershipStatementProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold uppercase mb-4 text-gray-800">{title}</h3>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-gray-700 leading-relaxed font-medium">{content}</p>
      </div>
    </div>
  )
}