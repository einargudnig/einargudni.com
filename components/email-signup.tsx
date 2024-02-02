'use client';

// import { Toaster } from './ui/sonner';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

type NewsletterForm = {
	name: string;
	email: string;
};

export function EmailSignUp() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = useForm<NewsletterForm>();

	async function onSubmit(formData: NewsletterForm) {
		console.log('FORMDATA', formData);
		await fetch('/api/newsletter-signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				name: formData.name,
				email: formData.email
			})
		}).then(() => {
			// Toast notification
			toast.success('Your email message has been sent successfully');
		});

		reset();
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-row items-center justify-center"
		>
			<div className="flex">
				<label htmlFor="name" className="sr-only">
					Name
				</label>
				<Input className="mr-2" type="text" placeholder="Name" {...register('name')} />
			</div>
			<div className="flex">
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<Input className="mr-2" type="email" placeholder="Email" {...register('email')} />
			</div>
			<div className="overflow-hidden relative">
				{/* i want to add some animation to this button
				<div className="glow inset-0 w-[25px] h-[25px] absolute rotate-45"></div>
				<div className="inline-block z-10 bg-white rounded-md"> */}
				<Button variant="default" disabled={isSubmitting} type="submit">
					Subscribe
				</Button>
				{/* </div> */}
			</div>
		</form>
	);
}
