import Image from "next/image"
import React from 'react'

const Flag = ({ c }: { c: string }) => {
    return <div className='flex items-center justify-center gap-x-1'>
        <div className='relative size-3 md:size-4'>
            <Image className="rounded-full object-cover absolute left-0" src={`/flag/${c}.webp`} alt={c} fill />
        </div>
        <span>{c}</span>
    </div>

}

export default Flag
