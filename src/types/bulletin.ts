export interface BulletinData {
  churchName: string
  motto: string
  date: string
  theme: string
  contactInfo: ContactInfo
  instructions: string
  hymnalKey: string
  serviceOrder: ServiceItem[]
}

export interface ContactInfo {
  address: string
  website: string
  wifi: {
    network: string
    password: string
  }
  staff: StaffMember[]
}

export interface StaffMember {
  name?: string
  title: string
  phone?: string
  email: string
}

export interface ServiceItem {
  type: string
  title: string
  [key: string]: any
}

export interface ResponsiveReadingItem {
  speaker: string
  text: string
  isCongregation: boolean
}

export interface GoForItItem {
  side: string
  text: string
}