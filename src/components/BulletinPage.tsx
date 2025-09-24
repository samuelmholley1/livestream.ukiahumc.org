import { BulletinData } from '@/types/bulletin'
import ServiceElement from './ServiceElement'
import Image from 'next/image'

interface BulletinPageProps {
  data: BulletinData
}

export default function BulletinPage({ data }: BulletinPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo-for-church-larger.jpg"
              alt="Ukiah United Methodist Church Logo"
              width={150}
              height={150}
              className="mx-auto rounded-lg shadow-lg"
              priority
            />
          </div>
          
          <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-800 mb-2">
            {data.churchName}
          </h1>
          
          {/* Contact Info */}
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            <p>{data.contactInfo.address}</p>
            <p>{data.contactInfo.website}</p>
            <p>Wi-Fi Network: {data.contactInfo.wifi.network} Password: {data.contactInfo.wifi.password}</p>
            {data.contactInfo.staff.map((staff, index) => (
              <p key={index}>
                {staff.name && `${staff.name}, `}{staff.title}
                {staff.phone && `, ${staff.phone}`} {staff.email}
              </p>
            ))}
          </div>

          <h2 className="text-xl font-bold uppercase tracking-wide text-blue-600 mb-2">
            {data.motto}
          </h2>
          
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800 mb-4">
            {data.date} ~ {data.theme}
          </h2>
          
          <div className="text-sm text-gray-600 mb-4">
            <p>{data.instructions}</p>
            <p className="mt-2">{data.hymnalKey}</p>
          </div>
        </header>

        {/* Service Order */}
        <div className="space-y-6">
          {data.serviceOrder.map((item, index) => (
            <ServiceElement key={index} item={item} />
          ))}
        </div>
      </div>
    </main>
  )
}