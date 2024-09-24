import React, { FC } from 'react';
import { currencies } from '@/lib/constent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AmountCard from '@/components/AmountCard';


interface Props {
    from: string;
    to: string;
    shortAmount: string;
}

const ConvertToOther: FC<Props> = ({ shortAmount, from, to }) => {
    const filteredCurrencies = currencies.filter((currency) => currency.c !== from && currency.c !== to);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Other currencies
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {filteredCurrencies.map((currency, index) => (
                        <AmountCard key={index} from={from} amount={shortAmount} to={currency.c} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ConvertToOther;
