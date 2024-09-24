import Flag from '@/components/Flag';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getShortForm } from '@/lib/utils';
import React from 'react'

interface Props {
    from: string;
    to: string;
    rate: number;
    rate2: number;
    h2?: string;
}

export default function ConvertionRates({ rate2, from, to, rate }: Props) {

    const numbers = [1, 5, 10, 12, 18, 25, 30, 50, 100, 250, 500, 1000];
    const ratesobject1 = numbers.map((num, i) => ({ key: i, num: num, cRate: num * rate }));
    const ratesobject2 = numbers.map((num, i) => ({ key: i, num: num, cRate: num * rate2 }));

    return (
        <Card>
            <CardContent className='grid md:grid-cols-2 gap-3'>
                <div className='w-full p-3 md:p-5'>
                    <CardTitle className='mb-3'>Conversion Rates {to} / {from}</CardTitle>
                    <table className='bg-accent w-full rounded-lg' aria-label="Conversion Rates">
                        <thead >
                            <tr className='font-bold'>
                                <td className='p-3 '><Flag c={from} /></td>
                                <td className='p-3 '><Flag c={to} /></td>
                            </tr>
                        </thead>
                        <tbody className='p-5'>
                            {ratesobject1.map(item => (
                                <tr key={item.key} className='border-b border-collapse'>
                                    <td className='p-1 px-3'>{item.num} {from}</td>
                                    <td className='p-1 px-3'>{getShortForm(item.cRate)} {to}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-full p-3 md:p-5'>
                    <CardTitle className='mb-3' >Conversion Rates {to} / {from}</CardTitle>
                    <table className='bg-accent w-full rounded-lg' aria-label="Conversion Rates">
                        <thead >
                            <tr className='font-bold'>
                                <td className='p-3 '><Flag c={to} /></td>
                                <td className='p-3 '><Flag c={from} /></td>
                            </tr>
                        </thead>
                        <tbody className='p-5'>
                            {ratesobject2.map(item => (
                                <tr key={item.key} className='border-b border-divider border-collapse'>
                                    <td className='p-1 px-3'>{item.num} {to}</td>
                                    <td className='p-1 px-3'>{getShortForm(item.cRate)} {from}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}