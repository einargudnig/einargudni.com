import Link from 'next/link';
import { UsesIcon } from '../icons';

export default function UsesButton() {

  return (
    <div className='h-48 border border-gray-200 rounded-md'>
      
    <Link href={`/uses`} className="flex items-center justify-center">
      <UsesIcon />{' '}uses
    </Link>
    </div>
  );
}