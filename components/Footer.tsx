import React, { FC } from 'react'
import { domain } from '@/config';
import Link from 'next/link';

const Footer: FC = () => {



    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="mt-auto h-full md:px-4 bg-transparent relative flex items-center border-t py-2 px-4">
            <p className='text-xs mx-auto leading-none'><span className='opacity-60'>Build By </span><Link className='hover:underline font-bold' href="https://github.com/sshahaider" target='_blank'>@sshaider</Link></p>
        </footer>
    )
}

export default Footer;