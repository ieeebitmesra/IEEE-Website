import mailchimp from '@mailchimp/mailchimp_marketing';
import { NextResponse } from 'next/server';

// Move this inside the POST function to ensure environment variables are loaded
const initMailchimp = () => {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_API_SERVER;

  if (!apiKey || !server) {
    throw new Error('Missing Mailchimp API credentials');
  }

  mailchimp.setConfig({
    apiKey,
    server,
  });

  return mailchimp;
};

export async function POST(req: Request) {
  try {
    const client = initMailchimp();
    const { email } = await req.json();

    if (!email || !email.length) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!audienceId) {
      throw new Error('MAILCHIMP_AUDIENCE_ID is not defined');
    }

    await client.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed'
    });

    return NextResponse.json(
      { message: 'Success! You are now subscribed to the newsletter.' },
      { status: 201 }
    );
  } catch (error: any) {
    // Check for existing subscriber error
    if (error.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'You are already subscribed to our newsletter!' },
        { status: 400 }
      );
    }

    console.error('Mailchimp error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong!' },
      { status: 500 }
    );
  }
}