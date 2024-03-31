import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestPayload {
	name: string;
	email: string;
}

export async function POST(request: NextRequest) {
	const { name, email } = (await request.json()) as RequestPayload;

	// console.log('REQUEST', request);

	try {
		const data = await resend.contacts.create({
			firstName: name,
			email,
			unsubscribed: false,
			audienceId: process.env.RESEND_API_NEWSLETTER_AUDIENCE_ID || ''
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error });
	}
}
