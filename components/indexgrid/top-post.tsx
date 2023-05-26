// a component that displays the top post, link to it and number of views
import { getMostViewedPost } from '@/lib/metrics';
import Link from 'next/link';
import { ViewsIcon } from '../icons';

export default function TopPost() {
  const { slug, count } = getMostViewedPost();
  // console.log('TOP POST', slug, count)

  return (
    <div className='border border-gray-200 rounded-md h-48'>
    <Link href={`/blog/${slug}`} className="flex items-center">
      <ViewsIcon />
      {`${count?.toLocaleString()} views on top post`}
    </Link>
    </div>
  );
}