import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react';

interface Props {
    from: string | undefined;
    to: string | undefined;
}

const HowTo: FC<Props> = ({ from, to }) => {

    const steps = [
        {
            step: "Enter Amount",
            dec: "Input the amount you want to convert from the source currency.",
        },
        {
            step: "Select Currencies",
            dec: "Choose both the source and target currencies for conversion using the dropdown menus.",
        },
        {
            step: "Click Convert Button",
            dec: "After selecting currencies, click the 'Convert' button to initiate the conversion process.",
        },
        {
            step: "Get Result",
            dec: "You're done! The converted amount will be displayed.",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    How to Convert {from} To {to}
                </CardTitle>
                <CardDescription>
                   Below are the simple steps to convert your currency from {from} to {to}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {steps.map(({ step, dec }, index) => (
                        <div key={index} className='bg-default-100 border border-divider rounded-xl p-4'>
                            <h3 className='text-sm font-thin mb-1'>STEP {index + 1}</h3>
                            <div className='text-xl md:text-3xl font-bold'>{step}</div>
                            <p>{dec}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default HowTo;
