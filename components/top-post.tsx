// a component that displays the top post, link to it and number of views
import { getMostViewedPost } from '@/lib/metrics';
import Link from 'next/link';
import { ViewsIcon } from './icons';

export default function TopPost() {
  const { slug, count } = getMostViewedPost();
  return (
    <div className='border-2 border-gray-200 rounded-md'>
    <Link href={`/blog/${slug}`} className="flex items-center">
      <ViewsIcon />
      {`${count?.toLocaleString()} views on top post`}
    </Link>
    </div>
  );
}