# Airtable API Management Guide

This guide shows how to manage your Prayer Requests/Service Messages using curl commands.

## Prerequisites

**Important**: Get your credentials from `.env.local`:
- `AIRTABLE_PAT` - Your Personal Access Token
- `AIRTABLE_BASE_ID` - Your base ID
- `AIRTABLE_TABLE_NAME` - Table name (default: "Prayer Requests")

Replace `YOUR_PAT_TOKEN` and `YOUR_BASE_ID` in the examples below with your actual values from `.env.local`.

## Common Operations

### 1. List All Records

View all messages with their timestamps, sorted by newest first:

```bash
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN"
```

To limit results (e.g., 5 most recent):
```bash
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc&maxRecords=5" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN"
```

### 2. Get the Oldest Record (Pinned Church Comment)

```bash
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?maxRecords=1&sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=asc" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN"
```

### 3. Update a Record

To update the pinned church comment (replace `RECORD_ID` with actual ID):

```bash
curl -X PATCH "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "records": [
      {
        "id": "RECORD_ID",
        "fields": {
          "Message": "Updated message text here",
          "Timestamp": "2025-11-23T18:00:00.000Z"
        }
      }
    ]
  }'
```

### 4. Create a New Record

```bash
curl -X POST "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "fields": {
      "FirstName": "John",
      "LastName": "Doe",
      "Message": "Prayer request text here",
      "Timestamp": "2025-11-23T18:30:00.000Z",
      "Session": "2025-11-23"
    }
  }'
```

### 5. Delete a Record

```bash
curl -X DELETE "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?records[]=RECORD_ID" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN"
```

### 6. Delete Multiple Records

```bash
curl -X DELETE "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?records[]=RECORD_ID_1&records[]=RECORD_ID_2" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN"
```

## Understanding Timestamps

### Timezone Information

- **Storage**: Airtable always stores timestamps in UTC (Coordinated Universal Time)
- **Display**: The website automatically converts UTC to Pacific Time for display
- **Pacific Time Offsets**:
  - **PST (Pacific Standard Time)**: UTC-8 (November - March)
  - **PDT (Pacific Daylight Time)**: UTC-7 (March - November)

### Converting Times

To convert Pacific Time to UTC for Airtable:

**During PST (Standard Time):**
- 10:00 AM PT = 18:00 UTC (add 8 hours)
- Format: `2025-11-23T18:00:00.000Z`

**During PDT (Daylight Time):**
- 10:00 AM PT = 17:00 UTC (add 7 hours)
- Format: `2025-06-15T17:00:00.000Z`

### Example: Setting Pinned Comment to 10:00 AM PT

The pinned church comment should always show 10:00 AM regardless of daylight saving.

**Current (PST - after Nov 3, 2025):**
```bash
curl -X PATCH "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "records": [
      {
        "id": "PINNED_COMMENT_RECORD_ID",
        "fields": {
          "Timestamp": "2025-11-02T18:00:00.000Z"
        }
      }
    ]
  }'
```

## Field Reference

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| FirstName | Text | Yes | Person's first name |
| LastName | Text | Yes | Person's last name |
| Message | Text | Yes | Message content (max 500 characters) |
| Timestamp | DateTime | Yes | When message was created (UTC) |
| Session | Text | Yes | Service date (YYYY-MM-DD format) |

## Automation Notes

### Auto-Cleanup System

The website automatically deletes all comments (except the pinned one) every Monday at 1:00 PM Pacific Time, which is 24 hours after Sunday service ends.

**How it works:**
1. Service runs Sunday 9:00 AM - 1:00 PM PT
2. Comments remain visible until Monday 1:00 PM PT
3. At Monday 1:00 PM PT, all comments deleted except first record (pinned comment)
4. Pinned comment always preserved

### The Pinned Comment

- **Name**: Ukiah United Methodist Church
- **Purpose**: Welcome message shown at all times
- **Protection**: First record in table (sorted by timestamp ascending) is always skipped by auto-delete
- **Finding Record ID**: Use the "Get the Oldest Record" command above

## Troubleshooting

### Check Current Records
```bash
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/Prayer%20Requests?sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc" \
  -H "Authorization: Bearer YOUR_PAT_TOKEN" | jq
```

*Note: The `| jq` at the end formats JSON output nicely (requires jq to be installed)*

### Common Issues

1. **Wrong timestamp displayed**: Make sure you're using UTC in Airtable. The website handles conversion.
2. **Record not found**: Use the GET command to verify the record ID exists.
3. **Permission denied**: Verify your PAT token is correct and has proper permissions.

## Security Note

⚠️ **Keep your Personal Access Token private!** Never commit it to public repositories or share it publicly. This token has full read/write access to your Airtable base.
