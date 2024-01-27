'use client';

// import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Resend } from 'resend';

export function EmailSignUp() {
	// const [name, setName] = useState<string>('');
	// const [email, setEmail] = useState<string>('');

	// use it to clear the inputs after submission
	// const ref = useRef();

	// const resend = new Resend(process.env.RESEND_API_KEY);

	const handleSubmit = () => {
		// resend.contacts.create({
		// 	email: email,
		// 	firstName: name,
		// 	unsubscribed: false,
		// 	audienceId: '' // Start by making audience
		// });
	};

	return (
		<div>
			<div className="flex flex-row items-center justify-center">
				<label htmlFor="name" className="sr-only">
					Name
				</label>

				<Input className="mr-2" type="text" name="name" id="bd-email" placeholder="Name" />

				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<Input className="mr-2" type="email" name="email" id="email" placeholder="Email" />
				<Button variant="secondary">Subscribe</Button>
			</div>
		</div>
	);
}
