import { ServiceSchedule } from '@/types/livestream'

interface ServiceScheduleDisplayProps {
  schedule: ServiceSchedule[]
  currentService?: ServiceSchedule
}

export default function ServiceScheduleDisplay({ schedule, currentService }: ServiceScheduleDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Service Schedule
      </h3>
      
      {currentService && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4 rounded">
          <h4 className="font-semibold text-blue-800 mb-1">Current Service</h4>
          <p className="text-blue-700">{currentService.service}</p>
          <p className="text-sm text-blue-600">{currentService.day} at {currentService.time}</p>
        </div>
      )}

      <div className="space-y-3">
        {schedule.map((service, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${
              currentService?.service === service.service 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{service.service}</h4>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {service.day}
              </span>
            </div>
            <p className="text-blue-600 font-medium mb-1">{service.time}</p>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          <strong>Can't join us live?</strong> Recordings will be available after each service.
        </p>
      </div>
    </div>
  )
}