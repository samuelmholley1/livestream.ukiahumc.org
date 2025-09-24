import { ServiceItem } from '@/types/bulletin'
import SectionTitle from './bulletin/SectionTitle'
import HymnDisplay from './bulletin/HymnDisplay'
import ResponsiveReading from './bulletin/ResponsiveReading'
import ScriptureReading from './bulletin/ScriptureReading'
import ContemporaryReading from './bulletin/ContemporaryReading'
import Announcements from './bulletin/Announcements'
import GoForIt from './bulletin/GoForIt'
import ThresholdMoment from './bulletin/ThresholdMoment'
import LordsPrayer from './bulletin/LordsPrayer'
import Message from './bulletin/Message'
import Offertory from './bulletin/Offertory'
import AsteriskedItem from './bulletin/AsteriskedItem'
import MembershipStatement from './bulletin/MembershipStatement'
import WelcomingStatement from './bulletin/WelcomingStatement'

interface ServiceElementProps {
  item: ServiceItem
}

export default function ServiceElement({ item }: ServiceElementProps) {
  switch (item.type) {
    case 'sectionTitle':
      return <SectionTitle title={item.title} />
    
    case 'hymn':
      return (
        <HymnDisplay
          title={item.title}
          hymnTitle={item.hymnTitle}
          number={item.number}
          source={item.source}
          verse={item.verse}
        />
      )
    
    case 'responsiveReading':
      return (
        <ResponsiveReading
          title={item.title}
          content={item.content}
        />
      )
    
    case 'scriptureReading':
      return (
        <ScriptureReading
          title={item.title}
          reference={item.reference}
          version={item.version}
          content={item.content}
        />
      )
    
    case 'contemporaryReading':
      return (
        <ContemporaryReading
          title={item.title}
          poemTitle={item.poemTitle}
          author={item.author}
          content={item.content}
        />
      )
    
    case 'announcements':
      return (
        <Announcements
          title={item.title}
          items={item.items}
        />
      )
    
    case 'goForIt':
      return (
        <GoForIt
          title={item.title}
          attribution={item.attribution}
          content={item.content}
        />
      )
    
    case 'thresholdMoment':
      return (
        <ThresholdMoment
          title={item.title}
          content={item.content}
        />
      )
    
    case 'lordsPrayer':
      return (
        <LordsPrayer
          title={item.title}
          content={item.content}
        />
      )
    
    case 'message':
      return (
        <Message
          title={item.title}
          messageTitle={item.messageTitle}
          speaker={item.speaker}
        />
      )
    
    case 'offertory':
      return (
        <Offertory
          title={item.title}
          song={item.song}
          artist={item.artist}
          offeringNote={item.offeringNote}
        />
      )
    
    case 'asteriskedItem':
      return (
        <AsteriskedItem
          title={item.title}
          hymnTitle={item.hymnTitle}
          number={item.number}
          source={item.source}
        />
      )
    
    case 'membershipStatement':
      return (
        <MembershipStatement
          title={item.title}
          content={item.content}
        />
      )
    
    case 'welcomingStatement':
      return (
        <WelcomingStatement
          title={item.title}
          content={item.content}
        />
      )
    
    default:
      return <div className="text-gray-500">Unknown service element: {item.type}</div>
  }
}