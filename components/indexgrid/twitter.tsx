import Link from 'next/link';
import { TwitterIcon } from '../icons';

export default function FollowTwitter() {

  return (
    <div className='h-48 border border-gray-200 rounded-md hover:text-neutral-700 dark:hover:text-neutral-200 transition-all'>
    <Link href={`https://twitter.com/einargudni`} rel="noopener noreferrer" target="_blank" className="flex items-center">
      <TwitterIcon />
      Follow me on twitter
    </Link>
    </div>
  );
}