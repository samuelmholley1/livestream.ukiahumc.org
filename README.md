# Ukiah United Methodist Church - Live Stream

This is the live stream platform for Ukiah United Methodist Church, built with Next.js and React. Features YouTube live streaming integration with fallback content and service scheduling.

## Current Structure
- **livestream.ukiahumc.org** - Live streaming platform with YouTube integration
- **Preserved:** All bulletin components available at /7-13-25 and other date routes

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** Yarn Berry (node_modules mode)
- **Runtime:** Node.js

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Features

- **Live YouTube Integration**: Responsive YouTube embed with live status detection
- **Service Scheduling**: Automated live/offline status based on service times
- **Fallback Content**: Engaging content when stream is offline
- **Mobile Responsive**: Optimized for all devices
- **Bulletin Integration**: Preserved bulletin system accessible via date routes
- **Professional Design**: Clean, church-appropriate interface

## Project Structure

```
src/
  app/
    layout.tsx           # Root layout component
    page.tsx            # Live stream homepage
    7-13-25/page.tsx    # Bulletin route (preserved)
    globals.css         # Global styles
  components/
    YouTubeEmbed.tsx         # Live stream video component
    LiveStreamStatus.tsx     # Live/offline status display
    ServiceScheduleDisplay.tsx  # Service times display
    bulletin/            # Preserved bulletin components
  types/
    livestream.ts       # Live stream TypeScript types
    bulletin.ts         # Preserved bulletin types
public/
  logo-for-church-larger.jpg  # Church logo
```

## YouTube Integration

To connect your actual YouTube channel:

1. Replace placeholder channel ID in `YouTubeEmbed.tsx`
2. Add YouTube API key for live status detection
3. Configure automatic live stream detection

## Deployment

This project is designed to be deployed as livestream.ukiahumc.org.

## Future Plans

- YouTube API integration for automatic live detection
- Chat integration during live streams
- Recording archive system
- Integration with main ukiahumc.org website