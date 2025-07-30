import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the email content
    const eventDetails = `
      <h2>Event Proposal Details</h2>
      <p><strong>Event Title:</strong> ${formData.title}</p>
      <p><strong>Event Type:</strong> ${formData.eventType}</p>
      <p><strong>Description:</strong> ${formData.description}</p>
      <p><strong>Target Audience:</strong> ${formData.targetAudience}</p>
      <p><strong>Expected Attendees:</strong> ${formData.expectedAttendees}</p>
      <p><strong>Proposed Date:</strong> ${formData.proposedDate}</p>
      <p><strong>Duration:</strong> ${formData.duration}</p>
      <p><strong>Venue:</strong> ${formData.venue}</p>
      <p><strong>Requirements:</strong> ${formData.requirements}</p>
      
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER, // Send to recipient or fallback to sender
      subject: `New Event Proposal: ${formData.title}`,
      html: eventDetails,
      replyTo: formData.email,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Event proposal submitted successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending event proposal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit event proposal' },
      { status: 500 }
    );
  }
}