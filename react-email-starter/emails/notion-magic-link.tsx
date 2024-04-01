import {
	Section,
	Body,
	Row,
	Column,
	Container,
	Button,
	Head,
	Heading,
	Html,
	Hr,
	Img,
	Link,
	Preview,
	Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export const NotionMagicLinkEmail = () => (
	<Html>
		<Head />
		<Preview>Triple-Three #01</Preview>
		<Tailwind>
			<Body className="bg-[#282726] my-auto mx-auto font-sans px-2">
				<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
					<Section className="mt-[32px]">
						<Img
							src={`${baseUrl}/static/newsletter-header1.png`}
							alt="newsletter header"
							className="my-0 mx-auto"
						/>
					</Section>
					<Heading className="text-white text-[24px] font-semibold text-center p-0 my-[30px] mx-0">
						triple three #01
					</Heading>
					<Text className="text-white text-lg leading-[24px]">Hello!,</Text>
					<Text className="text-white text-[14px] leading-[24px]">
						Welcome to the first edition of Triple Three, in this newsletter I will tell
						you about three things I have been working on, three things I have learned
						and three interesting things I have come across. I collect various things
						that I find interesting here:{' '}
						<Link href="https://remix-workbook.fly.dev/" className="text-[#00b0ff]">
							learnings.einargudni.com
						</Link>
					</Text>
					<Text className="text-white text-[14px] leading-[24px]">
						The items in these newsletters are not necessarily related to each other,
						but they are all things that I have found interesting and that I think you
						might find interesting too. Keep in mind that this is the first edition and
						I am still figuring out the format, so please let me know if you have any
						feedback or suggestions.
					</Text>
					<Text className="text-white font-semibold leading-[24px]">
						I want to send this newsletter every month, but this newsletter covers the
						first two months of the year 2024.
					</Text>
					<Section>
						<Text className="text-white text-lg font-bold">Work</Text>
						<Row>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">1.</Text>
									<Text className="text-white font-semibold">
										Updated aws-sdk on our Lambda functions
									</Text>
								</div>
								<Text className="text-white -mt-4">
									We had to update our aws-sdk version for our Lambda functions on
									our Serverless backend. Since we had to touch all of our
									functions we used the opportunity to improve the abstractions
									and logging. It puts us in better place in the close future, we
									can be quicker to iterate and trust our logs better.
								</Text>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">2.</Text>
									<Text className="text-white font-semibold">
										Released a new deluxe menu configuration
									</Text>
								</div>
								<Text className="text-white -mt-4">
									This was a big update for us! We strive to be better and this is
									a tiny step in that direction. We improved the supply of food
									for people on the deluxe menu. Everyone in the Maul team had to
									be a part of this and I think the results were as good as we
									could've made them. We are by no means done and continue to
									improve our system.
								</Text>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">3.</Text>
									<Text className="text-white font-semibold">FIT injection</Text>
								</div>
								<Text className="text-white -mt-4">
									We took time to improve our abstraction for our Failure
									Injection Testing. This will help us exponentially much to make
									our systems better. We can easily manipulate our API to behave
									they way we want to. This helps us to make error handling better
									for example.
								</Text>
								<Link
									href="https://netflixtechblog.com/fit-failure-injection-testing-35d8e2a9bb2"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									Netflix FIT
								</Link>
							</div>
						</Row>
					</Section>
					<Section className="mt-5">
						<Text className="text-white text-lg font-bold">Learnings</Text>
						<Row>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">1.</Text>
									<Text className="text-white font-semibold">
										React-email to my portfolio
									</Text>
								</div>
								<Text className="text-white -mt-4">
									I added React-email to send this email. The team at react-email
									and resend seems like they put DX above many other things. I am
									going to test that out and see how it works out.
								</Text>
								<Link
									href="https://react.email/"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									React-email
								</Link>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">2.</Text>
									<Text className="text-white font-semibold">
										Started to build Raycast extension
									</Text>
								</div>
								<Text className="text-white -mt-4">
									I am going to write a separated love letter to Raycast, but I
									use it a lot, and I wanted to build an extension for fun. It's
									not finished, but I'll let you know how it goes.
								</Text>
								<Link
									href="https://developers.raycast.com/basics/create-your-first-extension"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									Create your first Raycast extionsion
								</Link>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">3.</Text>
									<Text className="text-white font-semibold">Remix SPA mode</Text>
								</div>
								<Text className="text-white -mt-4">
									We migrated to the new react-router that used Loaders and
									Actions. That was the first step of moving to Remix. With the
									Remix SPA mode we saw a way that helped us with this migration.
									This might be a suitable way for us to go forward! I am at least
									very excited to test this out.
								</Text>
								<Link
									href="https://remix.run/docs/en/main/future/spa-mode"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									Remix SPA mode
								</Link>
							</div>
						</Row>
					</Section>
					<Section className="mt-5">
						<Text className="text-white text-lg font-bold">Interesting things</Text>
						<Row>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">1.</Text>
									<Text className="text-white font-semibold">
										600 days of readwise
									</Text>
								</div>
								<Text className="text-white -mt-4">
									During this period I have used readwise 600 days in a row.
									Consistency builds habits!
								</Text>
								<Link
									href="https://readwise.io/"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									readwise.io
								</Link>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">2.</Text>
									<Text className="text-white font-semibold">
										Generate fake data with typescript and raycast.
									</Text>
								</div>
								<Text className="text-white -mt-4">
									This is a handy and cool tip I saw on twitter. You can make this
									Ai command in Raycast to help you generate fake data from the
									Type you create. I use this quite a lot in my development.
								</Text>
								<Link
									href="https://twitter.com/HugoRCD__/status/1755528539309326706"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									Twitter thread
								</Link>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">3.</Text>
									<Text className="text-white">https://ui.aceternity.com/</Text>
								</div>
								<Text className="text-white -mt-4">
									This is like shadcn-ui on steroids. Lot of components to make
									your webpage look great. It's easy to use them and make them
									your own. I'm shocked at how good this is, and it's free 😮‍💨
								</Text>
								<Link
									href="https://ui.aceternity.com/"
									className="text-[#00b0ff] text-sm -mt-4"
								>
									https://ui.aceternity.com/
								</Link>
							</div>
						</Row>
					</Section>

					<Section>
						<Text className="text-white">See you next time!</Text>
					</Section>
					<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
					<Text className="text-[#666666] text-[12px] leading-[24px]">
						You are receiving this email because you signed up for my newsletter.
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default NotionMagicLinkEmail;
