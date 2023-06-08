import me from '../app/avatar.jpeg';

export const name = 'Einar Gudni';
export const avatar = me;
export const about = () => {
	return <>Hey, I&apos;m Einar. A curious software developer from Iceland.</>;
};
export const bio = () => {
	return (
		<>
			I&apos;m a Next.js contributor and help lead our open-source communities. I&apos;m
			passionate about frontend development and have created courses on React, Next.js, and
			web development. I&apos;m an advisor and investor in early stage startups.
		</>
	);
};
