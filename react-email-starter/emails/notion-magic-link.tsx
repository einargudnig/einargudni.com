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
					<Text className="text-white text-lg leading-[24px]">Hello username,</Text>
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
						last two months.
					</Text>
					<Section>
						<Text className="text-white text-lg font-bold">Work</Text>
						<Row>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">1.</Text>
								<Text className="text-white font-semibold">
									Updated aws-sdk on our Lambda functions
								</Text>
							</div>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">2.</Text>
								<Text className="text-white font-semibold">
									Released a new deluxe menu configuration
								</Text>
							</div>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">3.</Text>
								<Text className="text-white font-semibold">FIT injection</Text>
							</div>
						</Row>
					</Section>
					<Section>
						<Text className="text-white text-lg font-bold">Learnings</Text>
						<Row>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">1.</Text>
								<Text className="text-white font-semibold">
									React-email to my portfolio
								</Text>
							</div>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">2.</Text>
								<Text className="text-white font-semibold">
									Started to build Raycast extension
								</Text>
							</div>
							<div className="flex">
								<Text className="text-white font-semibold mr-2">3.</Text>
								<Text className="text-white font-semibold">Remix SPA mode</Text>
							</div>
						</Row>
					</Section>
					<Section>
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
									During this period I have used readwise 600 days in a row
								</Text>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">2.</Text>
									<Text className="text-white">
										Generate fake data with typescript and raycast
									</Text>
								</div>
								<Text className="text-white -mt-4">
									This is a handy and cool tip I saw on twitter. You can make this
									snippet in Raycast to help you generate fake data from the Type
									you create. I use this quite a lot in my development.
								</Text>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<Text className="text-white font-semibold mr-2">3.</Text>
									<Text className="text-white">https://ui.aceternity.com/</Text>
								</div>
								<Text className="text-white -mt-4">
									This is like shadcn-ui on steroids. Lot of components{' '}
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
