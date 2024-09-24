import React, { FC } from 'react'
import { getShortForm } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AmountCard from '@/components/AmountCard';

interface Prps {
    amount: number;
    from: string;
    to: string;
}

const OtherAmounts: FC<Prps> = ({ amount: number, from, to }) => {

    const uniqueNumbers = new Set(); // Use a set to store unique numbers
    const numbersPlus20 = Array.from({ length: 5 }, () => {
        let randomNumber = Math.floor(Math.random() * (Math.min(number + 40, 9999))); // Limit to 9999
        while (uniqueNumbers.has(randomNumber) || randomNumber < 2) {
            randomNumber = Math.floor(Math.random() * (Math.min(number + 40, 9999))); // Limit to 9999
        }
        uniqueNumbers.add(randomNumber);
        return randomNumber;
    });

    const numbersMinus20 = number > 20 ? Array.from({ length: 5 }, () => {
        let randomNumber = Math.floor(Math.random() * (Math.min(number + 10, 9999))); // Limit to 9999
        while (uniqueNumbers.has(randomNumber) || randomNumber < 2) {
            randomNumber = Math.floor(Math.random() * (Math.min(number + 10, 9999))); // Limit to 9999
        }
        uniqueNumbers.add(randomNumber);
        return randomNumber;
    }) : [12];

    const anArray = numbersMinus20.concat(numbersPlus20);

    const related = anArray.filter(item => item !== number);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Try other Amounts!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {related.map((item, index) => (
                        <AmountCard key={index} from={from} amount={getShortForm(item)} to={to} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default OtherAmounts
