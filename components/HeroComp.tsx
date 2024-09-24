import React from 'react'
import Converter from './Converter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Props {
    from: string;
    to: string;
    amount: number;
    shortAmount?: string;
    generatedRate?: string;
    heading?: string;
    text?: string;
    ish2?: boolean;
}

const HeroComp: React.FC<Props> = ({ heading, ish2, text, from, to, amount, shortAmount, generatedRate }) => {
    const currentTime = new Date();

    const getFormattedDate = () => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return currentTime.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: userTimeZone,
            timeZoneName: 'shortOffset'
        });
    }


    return (
        <div className="min-h-1/2 rounded-xl mb-28  flex flex-col md:flex-row items-center justify-center bg-[url('/exchangerates.webp')] bg-cover bg-center" >
            <div className='w-full p-4 h-full rounded-xl bg-black bg-opacity-80 flex flex-col lg:flex-row gap-y-4 md:gap-x-4 items-center justify-center'>
                <CardHeader className='w-full lg:max-w-lg xl:max-w-xl text-white'>
                    {ish2 ? <h2>{heading ? heading : "Currency Converter"}</h2> : <h1>{heading ? heading : "Currency Converter"}</h1>}
                    <CardDescription className='text-white'>{text ? text : "Get up-to-date currency rates for over 140 world currencies with this easy-to-use currency converter."}</CardDescription>
                </CardHeader>
                <Card className='-mb-24  w-full max-w-full mt-5 p-4 flex flex-col items-center justify-center gap-y-4 '>
                    <Converter from={from} to={to} amount={amount} />
                    <div className='flex flex-col items-center justify-center mt-2'>
                        {generatedRate && <>
                            <p className='opacity-80 my-1 text-xs'>{getFormattedDate()}</p>
                            <h2 className='my-1'>{shortAmount} {from} = {generatedRate} {to}</h2>
                        </>}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default HeroComp
