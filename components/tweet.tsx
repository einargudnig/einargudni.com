// import { useState, useEffect } from 'react';
// import { getTweet } from 'react-tweet/api';
// import { EmbeddedTweet, TweetNotFound, TweetProps } from 'react-tweet';
// import './tweet.css';

// interface Props {
// 	id: string;
// 	components?: TweetProps['components'];
// }

// const TweetComponent = ({ id, components }: Props) => {
// 	const [tweetContent, setTweetContent] = useState<JSX.Element | null>(null);

// 	useEffect(() => {
// 		const fetchTweetContent = async () => {
// 			try {
// 				const tweet = await getTweet(id);
// 				setTweetContent(<EmbeddedTweet tweet={tweet} components={components} />);
// 			} catch (error) {
// 				const NotFound = components?.TweetNotFound || TweetNotFound;
// 				setTweetContent(<NotFound error={error} />);
// 			}
// 		};
//
// 		fetchTweetContent();
// 	}, [id, components]);

// 	return <div className="tweet my-6">{tweetContent}</div>;
// };

// export default TweetComponent;
