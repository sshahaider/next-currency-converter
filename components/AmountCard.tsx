import Link from 'next/link';
import React, { FC } from 'react'
import Flag from './Flag';
import { ArrowLeftRight } from 'lucide-react';

interface Props {
    amount: string;
    from: string;
    to: string;
}

const AmountCard: FC<Props> = ({ from, amount, to }) => {
    return (
        <Link href={`/${from.toLowerCase()}/${to.toLowerCase()}/convert/${amount}`} className='uppercase border rounded-lg w-full flex p-2 text-xs md:text-sm'>
            <div className='flex items-center justify-center w-[50%]'>
                <span className='ml-1'>{amount}</span>
                <span className='ml-1'>{from}</span>
            </div>
            <div className='flex items-center justify-center w-[20%]'>
            <ArrowLeftRight className="size-5 -mb-1" />
            </div>
            <div className='flex items-center justify-center w-[30%]'>
                <Flag c={to} />
            </div>
        </Link>
    )
}

export default AmountCard;
