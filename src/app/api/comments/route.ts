import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Prayer Requests'

// GET - Fetch comments for current session
export async function GET(request: NextRequest) {
  try {
    if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Airtable configuration missing' },
        { status: 500 }
      )
    }

    // Get current Sunday session date (YYYY-MM-DD)
    const now = new Date()
    const sessionDate = now.toISOString().split('T')[0]

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?filterByFormula={Session}='${sessionDate}'&sort[0][field]=Timestamp&sort[0][direction]=desc`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from Airtable')
    }

    const data = await response.json()

    const comments = data.records.map((record: any) => ({
      id: record.id,
      firstName: record.fields.FirstName || '',
      lastName: record.fields.LastName || '',
      message: record.fields.Message || '',
      timestamp: record.fields.Timestamp || '',
    }))

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST - Submit new comment
export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Airtable configuration missing' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { firstName, lastName, message, password } = body

    // Validate password
    if (password !== 'lovewins') {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!firstName || !lastName || !message) {
      return NextResponse.json(
        { error: 'First name, last name, and message are required' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be 500 characters or less' },
        { status: 400 }
      )
    }

    // Get current Sunday session date
    const now = new Date()
    const sessionDate = now.toISOString().split('T')[0]
    const timestamp = now.toISOString()

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          FirstName: firstName.trim(),
          LastName: lastName.trim(),
          Message: message.trim(),
          Timestamp: timestamp,
          Session: sessionDate,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Airtable error:', errorData)
      throw new Error('Failed to submit to Airtable')
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      comment: {
        id: data.id,
        firstName: data.fields.FirstName,
        lastName: data.fields.LastName,
        message: data.fields.Message,
        timestamp: data.fields.Timestamp,
      },
    })
  } catch (error) {
    console.error('Error submitting comment:', error)
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    )
  }
}
