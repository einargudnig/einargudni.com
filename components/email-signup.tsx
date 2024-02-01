'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Resend } from 'resend';

export function EmailSignUp() {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	// use it to clear the inputs after submission
	// const ref = useRef();

	// const resend = new Resend(process.env.RESEND_API_KEY);

	const handleSubmit = () => {
		console.log('name', name);
		// resend.contacts.create({
		// 	email: email,
		// 	firstName: name,
		// 	unsubscribed: false,
		// 	audienceId: '' // Start by making audience
		// });
	};

	return (
		<div className="flex flex-row items-center justify-center">
			<div className="flex">
				<label htmlFor="name" className="sr-only">
					Name
				</label>
				<Input className="mr-2" type="text" name="name" id="bd-email" placeholder="Name" />
			</div>
			<div className="flex">
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<Input className="mr-2" type="email" name="email" id="email" placeholder="Email" />
			</div>
			<div className="overflow-hidden relative">
				{/* i want to add some animation to this button
				<div className="glow inset-0 w-[25px] h-[25px] absolute rotate-45"></div>
				<div className="inline-block z-10 bg-white rounded-md"> */}
				<Button variant="default" onClick={handleSubmit}>
					Subscribe
				</Button>
				{/* </div> */}
			</div>
		</div>
	);
}
