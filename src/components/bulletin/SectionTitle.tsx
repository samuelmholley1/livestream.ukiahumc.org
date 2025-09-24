interface SectionTitleProps {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-bold uppercase mt-8 mb-3 border-b pb-2 text-gray-800">
      {title}
    </h2>
  )
}