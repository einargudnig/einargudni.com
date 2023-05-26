import Link from 'next/link';

export default function UsesButton() {

  return (
    <div className='h-48 border border-gray-200 rounded-md'>
    <Link href={`/uses`} className="flex items-center">
      uses
    </Link>
    </div>
  );
}