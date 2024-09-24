"use client";

import React, { FC } from 'react'
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'next-share'

interface Props {
    link: string;
    label: string;
}

const NextShare: FC<Props> = ({ link, label }) => {
    return (
        <div className='flex items-center justify-center w-full gap-x-2 my-5'>
            <FacebookShareButton
                url={link}
                quote={label}
                hashtag={'#exchangerates'}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton
                url={link}
                media={label}
            >
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <TwitterShareButton
                url={link}
                title={label}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
                url={link}
                title={label}
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <LinkedinShareButton
                url={link}
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    )
}

export default NextShare;
