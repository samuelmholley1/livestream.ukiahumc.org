export interface LiveStreamData {
  isLive: boolean
  youtubeVideoId?: string
  streamTitle?: string
  scheduledStart?: string
  viewerCount?: number
}

export interface ServiceSchedule {
  day: string
  time: string
  service: string
  description: string
}

export interface LiveStreamConfig {
  youtubeChannelId: string
  defaultVideoId?: string
  fallbackMessage: string
  serviceSchedule: ServiceSchedule[]
}