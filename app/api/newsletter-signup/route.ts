import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	// @ts-ignore
	const { name, email } = await req.body?.json();

	try {
		const data = await resend.contacts.create({
			name: name,
			email: email,
			unsubscribed: false,
			audienceId: '' // Start by making audience
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error });
	}
}
