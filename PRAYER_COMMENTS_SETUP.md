# Prayer Comments Setup Guide

## ✅ What You Get

- **Time-Gated**: Comment box only opens 9:55am-11:30am PT on Sundays
- **Password Protected**: Requires "lovewins" to access
- **Auto-Refreshing**: Comments update every 5 seconds (like Facebook)
- **Session-Based**: Each Sunday is a new session, comments reset
- **Airtable Storage**: All comments saved with timestamp and names
- **Character Counter**: 500 character limit with live countdown

## 🛠️ Airtable Setup (5 minutes)

### Step 1: Create Airtable Account
1. Go to https://airtable.com/signup
2. Sign up (free plan is perfect)

### Step 2: Create Base
1. Click "Create a base" → "Start from scratch"
2. Name it: `livestream.ukiahumc.org Comments`

### Step 3: Create Table
1. Rename "Table 1" to: `Prayer Requests`
2. Add these fields (columns):
   - `FirstName` (Single line text)
   - `LastName` (Single line text)
   - `Message` (Long text)
   - `Timestamp` (Single line text)
   - `Session` (Single line text)

### Step 4: Create Personal Access Token (PAT)
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it: `livestream.ukiahumc.org Comments`
4. Under "Scopes", select:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
5. Under "Access", click "Add a base"
6. Select your `livestream.ukiahumc.org Comments` base
7. Click "Create token"
8. **COPY THE TOKEN** (starts with `pat...` - you can only see it once!)

### Step 5: Get Base ID
1. Go to https://airtable.com/api
2. Click your `livestream.ukiahumc.org Comments` base
3. Find "INTRODUCTION" section
4. Copy the Base ID (starts with `app...`)

## 🔐 Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Prayer Requests
```

**Note:** The token starts with `pat` (Personal Access Token), not `key`

## 📱 How It Works

### For Viewers (Sundays 9:55am-11:30am PT):
1. Visit livestream.ukiahumc.org
2. Scroll below video
3. Enter password: "lovewins"
4. Fill in first name, last name, message
5. Submit
6. See their comment appear with others

### For WorshipTech Team:
1. Keep livestream.ukiahumc.org open on tablet/laptop
2. Comments auto-refresh every 5 seconds
3. No manual refresh needed
4. See all new comments as they come in

### Outside Service Hours:
- Shows message: "Email office@ukiahumc.org by Wednesday"
- Comment box is hidden
- No spam possible

## 🎯 Features

✅ **Real-time updates** - Like Facebook, no refresh needed
✅ **Password protected** - "lovewins" required
✅ **Time-gated** - Only open during service
✅ **Character limit** - 500 chars with live counter
✅ **Session management** - Each Sunday is fresh start
✅ **Name required** - First and last name for all comments
✅ **Clean design** - Matches your minimal site aesthetic
✅ **Mobile responsive** - Works on phones, tablets, computers
✅ **Airtable backup** - All comments permanently stored

## 📊 Airtable Benefits

After service, you can:
- Review all prayer requests
- Tag for follow-up
- Export to spreadsheet
- Track trends over time
- Share with pastoral care team

## 🔒 Security

- Password "lovewins" required (already known to congregation)
- Only open 1.5 hours per week
- API keys in environment variables (never in code)
- Rate limiting on API
- Comments tied to real names

## 💡 Tips

**For WorshipTech Team:**
- Open livestream.ukiahumc.org on iPad/laptop before service
- Position where easy to glance at
- Comments show newest first
- Each has timestamp
- FB-style design with initials avatar

**For Pastor:**
- After service, view all in Airtable
- Can respond via email if they provided one
- Historical record of prayer needs

## ❓ Troubleshooting

**Comments not appearing?**
- Check Vercel environment variables are set
- Verify Airtable API key is correct
- Check it's Sunday 9:55am-11:30am PT

**Password not working?**
- Must be exactly: lovewins (lowercase, no spaces)

**Can't see comment box?**
- Only visible during service hours
- Check system time is correct

## 🚀 Ready to Go!

Once Airtable is set up and environment variables are in Vercel, it just works!
