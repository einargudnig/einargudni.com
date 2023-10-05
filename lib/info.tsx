import me from '../app/avatar.jpeg';

export const name = 'Einar Gudni';
export const avatar = me;
export const about = () => {
	return (
		<>
			Hey <span className="animate-wave">👋🏼</span>, I&apos;m Einar. A curious software
			developer from Iceland.
		</>
	);
};
export const bio = () => {
	return (
		<>
			This is my little home on the internet 🏡
			<br />
			<br />
			Like many of you have almost infinite amount of ideas I would like to add to this home.
			I will slowly try new ideas here. Some might be weird and removed later, some might
			stick around. This is just a little laboratory for me to play around.
		</>
	);
};
