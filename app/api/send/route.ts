// import { EmailTemplate } from '@/components/email-template';
import { NotionMagicLinkEmail } from '@/react-email-starter/emails/notion-magic-link';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const data = await resend.emails.send({
			from: 'Einar Gudni <triple-three@einargudni.com>',
			to: ['delivered@resend.dev'], //audience??
			subject: 'Triple-three #01',
			react: NotionMagicLinkEmail()
		});

		return Response.json(data);
	} catch (error) {
		return Response.json({ error });
	}
}
