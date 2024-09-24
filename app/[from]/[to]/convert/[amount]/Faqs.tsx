import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import React, { FC } from "react";

interface Props {
    arr: {
        q: string;
        a: string;
    }[]
}

const Faqs: FC<Props> = ({ arr }) => {
    return (
        <Card>
            <CardContent>
                <CardTitle>
                    What is Exchange Rates?
                </CardTitle>
                <CardDescription>
                    Exchange rates indicate the value of one currency in comparison to another. They are constantly changing due to various factors, such as supply and demand, economic indicators, geopolitical events, and market sentiment
                </CardDescription>
            </CardContent>
            <CardContent>
                {arr.map((item, i) => (
                    <div key={i}>
                        <h2>{item.q}</h2>
                        <p>{item.a}</p>
                    </div>
                ))}
            </CardContent>
        </Card >
    )
};

export default Faqs;