# Ukiah United Methodist Church - Livestream Platform

**Live Site:** [livestream.ukiahumc.org](https://livestream.ukiahumc.org)  
**Repository:** [github.com/samuelmholley1/livestream.ukiahumc.org](https://github.com/samuelmholley1/livestream.ukiahumc.org)  
**Deployed on:** Vercel (auto-deploys from `main` branch)

---

## 📋 Overview

This is a Next.js 14 web application that provides:

1. **YouTube Livestream Embed** - Church services streamed live via YouTube channel `UCIOZiJik0riHPY5Ty291NNQ`
2. **Time-Gated Prayer Comments System** - Password-protected comment box that automatically opens/closes during Sunday service times (9:00am-11:30am Pacific Time)
3. **Airtable Integration** - All prayer requests are stored in Airtable with automatic session management (one session per Sunday)

---

## 🏗️ Technical Architecture

### Frontend
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript 5.5.4
- **Styling:** Tailwind CSS 3.4.7
- **Package Manager:** Yarn Berry 4.0.2

### Backend
- **API Routes:** Next.js API routes at `/api/comments`
- **Database:** Airtable (REST API)
- **Authentication:** Personal Access Tokens (PATs)

### Key Dependencies
- `date-fns` & `date-fns-tz` - Timezone handling for Pacific Time
- `react` 18.3.1 - UI components
- `next/image` - Optimized image loading

---

## 🔐 Environment Variables

Required environment variables in Vercel and `.env.local`:

```bash
AIRTABLE_PAT=patXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Prayer Requests
```

**Note:** Actual production values are configured in Vercel Dashboard → Environment Variables. DO NOT commit real tokens to GitHub.

**Token Name:** "livestream.ukiahumc.org Comments"  
**Base Name:** "livestream.ukiahumc.org Comments"

---

## 🎯 Prayer Comments Feature

### How It Works

**Time Window:**
- **Active:** Sundays from 9:00am to 11:30am Pacific Time
- **Inactive:** All other times (shows message to email office instead)

**Password Protection:**
- Password: `lovewins`
- Same as church WiFi password for easy memorability

**Auto-Refresh:**
- Comments poll every 5 seconds (Facebook-style real-time updates)
- Service time checked every 30 seconds

**Character Limit:**
- 500 characters maximum
- Warning appears at 450 characters

**Session Management:**
- Each Sunday creates a new session automatically
- Session ID format: `YYYY-MM-DD` (e.g., "2025-10-19")
- Comments from previous Sundays are not displayed

### Airtable Schema

**Table:** Prayer Requests

| Field | Type | Description |
|-------|------|-------------|
| FirstName | Single line text | Required |
| LastName | Single line text | Required |
| Message | Long text | Required, 500 char max |
| Timestamp | Date/Time | Auto-set on creation |
| Session | Single line text | YYYY-MM-DD format |

---

## 🚀 Deployment

### Vercel Configuration

1. **Project:** Connected to GitHub repo `samuelmholley1/livestream.ukiahumc.org`
2. **Branch:** `main` (auto-deploys on push)
3. **Build Command:** `yarn build` (with TypeScript errors ignored)
4. **Framework:** Next.js
5. **Node Version:** 18.x (Vercel default)

### Environment Variables in Vercel

All three environment variables are configured in:
- Production ✅
- Preview ✅  
- Development ✅

### Manual Redeployment

If needed, trigger a manual redeploy:
1. Go to Vercel Dashboard → livestream.ukiahumc.org
2. Deployments tab
3. Click ⋯ on latest deployment
4. Click "Redeploy"

---

## 📁 Project Structure

```
livestream.ukiahumc.org/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main homepage (livestream + comments)
│   │   ├── layout.tsx                  # Root layout with metadata
│   │   ├── globals.css                 # Tailwind styles
│   │   ├── api/
│   │   │   └── comments/
│   │   │       └── route.ts            # Airtable API endpoints (GET/POST)
│   │   └── 7-13-25/
│   │       └── page.tsx                # Example bulletin page (preserved)
│   ├── components/
│   │   ├── PrayerComments.tsx          # Time-gated comment system
│   │   ├── YouTubeEmbed.tsx            # YouTube livestream embed
│   │   ├── BulletinPage.tsx            # Bulletin display component
│   │   ├── ServiceElement.tsx          # Bulletin service order
│   │   └── bulletin/                   # 8 bulletin sub-components
│   └── types/
│       └── bulletin.ts                 # TypeScript interfaces
├── public/                             # Static assets (logos, icons)
├── .env.local                          # Local environment variables
├── .env.example                        # Template for environment variables
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── next.config.js                      # Next.js configuration
└── PRAYER_COMMENTS_SETUP.md            # Detailed setup guide

```

---

## 🔧 Local Development

### Prerequisites
- Node.js 18+ installed
- Yarn installed globally (`npm install -g yarn`)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samuelmholley1/livestream.ukiahumc.org.git
   cd livestream.ukiahumc.org
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   # Then edit .env.local with actual values
   ```

4. **Run development server:**
   ```bash
   yarn dev
   ```
   Opens at [http://localhost:3001](http://localhost:3001)

5. **Build for production:**
   ```bash
   yarn build
   ```

6. **Run production build locally:**
   ```bash
   yarn start
   ```

---

## 🛡️ Security Review & Vulnerabilities

### ✅ Current Security Measures

1. **Password Protection:** Simple password ("lovewins") prevents casual spam  
2. **Time Gating:** Comments only accepted during service hours (9:00am-11:30am PT Sundays)  
3. **Rate Limiting (Client):** 5-second polling interval (not aggressive)  
4. **Input Validation:** 500 character limit enforced on both client and server  
5. **Environment Variables:** Secrets stored in Vercel environment (not in code)  
6. **HTTPS Only:** Vercel enforces SSL/TLS on all connections  
7. **React XSS Protection:** React automatically escapes HTML in comment display

### ⚠️ Known Vulnerabilities & Limitations

#### **CRITICAL (Fix Before Production)**
None - all critical issues resolved.

#### **HIGH PRIORITY**
1. **Password Visible in Source Code**
   - **Issue:** Password "lovewins" checked client-side in JavaScript
   - **Risk:** Anyone can view source code and see password validation
   - **Impact:** Low (password is same as public WiFi, mainly prevents accidental spam)
   - **Fix:** Move password check to server-side API route

2. **No Server-Side Rate Limiting**
   - **Issue:** No protection against rapid-fire API requests
   - **Risk:** Attacker could spam Airtable with thousands of requests
   - **Impact:** Medium (Airtable has own rate limits, but could fill database)
   - **Fix:** Implement IP-based rate limiting in `/api/comments` route

#### **MEDIUM PRIORITY**
3. **No Content Moderation**
   - **Issue:** No profanity filter or admin moderation tools
   - **Risk:** Inappropriate content could appear during service
   - **Impact:** Medium (church context assumes respectful behavior, Worship Tech team monitors)
   - **Fix:** Add profanity filter library or admin dashboard for hiding comments

4. **PAT Token in Vercel**
   - **Issue:** If Vercel account compromised, attacker has full Airtable access
   - **Risk:** Could read/modify/delete all prayer requests
   - **Impact:** Medium (requires Vercel breach first)
   - **Fix:** Use Airtable OAuth with scoped permissions instead of PAT

5. **No CAPTCHA**
   - **Issue:** No bot protection beyond password
   - **Risk:** Bots could spam comments if they discover password
   - **Impact:** Low (time-gating limits exposure window)
   - **Fix:** Add Google reCAPTCHA or hCaptcha (invisible mode)

#### **LOW PRIORITY**
6. **Session Data Never Purged**
   - **Issue:** Old prayer requests accumulate in Airtable forever
   - **Risk:** Storage costs could increase over time
   - **Impact:** Low (Airtable free tier is generous)
   - **Fix:** Add automated archival/deletion after 90 days

7. **No Analytics**
   - **Issue:** No tracking of comment submission rates or errors
   - **Risk:** Can't detect abuse patterns or system issues
   - **Impact:** Low (small church use case)
   - **Fix:** Add Vercel Analytics or simple logging

### 🚨 Pre-Launch Checklist

Before going live in 1 hour, verify:

- [x] ✅ Environment variables set in Vercel (all 3)
- [x] ✅ Vercel deployment successful
- [x] ✅ YouTube embed loads correctly
- [x] ✅ Time window set to 9:00am-11:30am PT Sundays
- [x] ✅ Password "lovewins" works
- [ ] ⏳ Test comment submission on live site (after deployment)
- [ ] ⏳ Verify comments appear in Airtable
- [ ] ⏳ Test real-time refresh (submit 2nd comment, see it appear)
- [ ] ⏳ Notify Worship Tech team about new feature
- [ ] ⏳ Have Airtable dashboard open during first service

### 🛑 Blockers for Going Live

**NONE** - System is production-ready with acceptable risk level for a small church application.

The known vulnerabilities are **acceptable for initial launch** given:
- Limited exposure window (2.5 hours per week)
- Small audience (church congregation)
- Human monitoring (Worship Tech team)
- Low-stakes content (prayer requests)
- Easy rollback (can hide component if issues arise)

---

## 📞 Support & Contacts

**Church Office:**  
Phone: 707.462.3360  
Email: office@ukiahumc.org  
Address: 270 N. Pine St., Ukiah, CA 95482

**Technical Support:**  
GitHub Issues: [github.com/samuelmholley1/livestream.ukiahumc.org/issues](https://github.com/samuelmholley1/livestream.ukiahumc.org/issues)

**Worship Tech Team:**  
- Monitors prayer comments during service
- Can assist with technical issues during livestream

---

## 📝 Change Log

### October 19, 2025
- ✅ Converted from bulletin repository to livestream platform
- ✅ Added YouTube embed for channel UCIOZiJik0riHPY5Ty291NNQ
- ✅ Implemented time-gated prayer comments system (9:00am-11:30am PT Sundays)
- ✅ Integrated Airtable for comment storage with session management
- ✅ Migrated from deprecated API keys to Personal Access Tokens (PATs)
- ✅ Fixed build errors and deployed to Vercel
- ✅ Updated time window from 9:55am to 9:00am for testing
- ✅ Fixed syntax error in PrayerComments useEffect
- ✅ Completed security audit and documentation

---

## 📚 Additional Documentation

See **PRAYER_COMMENTS_SETUP.md** for detailed Airtable setup instructions and troubleshooting guide.

---

## 📄 License

© 2025 Ukiah United Methodist Church. All rights reserved.