import { NextResponse } from "next/server"
import mailchimp from '@mailchimp/mailchimp_marketing'

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!, // e.g., 'us1', 'us2', etc.
})

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Add subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: '', // You can collect first name if needed
        LNAME: '', // You can collect last name if needed
      },
    })

    if (response.id) {
      return NextResponse.json({
        success: true,
        message: "Successfully subscribed to newsletter! You'll receive updates on our latest research and blog posts.",
      })
    } else {
      throw new Error("Failed to add subscriber to Mailchimp")
    }
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    
    // Handle specific Mailchimp errors
    if (error.status === 400 && error.title === 'Member Exists') {
      return NextResponse.json({
        success: false,
        message: "This email is already subscribed to our newsletter",
      })
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to subscribe to newsletter. Please try again later." },
      { status: 500 }
    )
  }
}
