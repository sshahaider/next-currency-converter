import { notFound } from "next/navigation";
import { siteLink, siteName } from "@/config";
import HeroComp from "@/components/HeroComp";
import { getShortForm } from "@/lib/utils";
import Script from "next/script";
import { currencies } from "@/lib/constent";
import OtherAmounts from "./OtherAmounts";
import ConvertionRates from "./ConvertionRates";
import ConvertToOther from "./ConvertToOther";
import HowTo from "./HowTo";
import Faqs from "./Faqs";
import NextShare from "@/components/NextShare";

interface PageProps {
    params: { from: string, to: string, amount: number };
}


const findCurrencyByName = (name: string) => currencies.find(curr => curr?.c === name);

export function generateMetadata({ params }: PageProps) {
    const { from, to, amount } = params;
    if (from === to) return notFound();
    const upFrom = from.toUpperCase();
    const upTo = to.toUpperCase();

    const fromCurrency = findCurrencyByName(upFrom);
    const toCurrency = findCurrencyByName(upTo);
    if (!fromCurrency || !toCurrency) return notFound();

    const meta = {
        title: `Convert ${amount} ${upFrom} to ${upTo} at the current exchange rate!`,
        description: `How much is ${amount} ${upFrom} in ${upTo}?, Discover the current exchange rate and convert ${amount} ${fromCurrency?.n} to ${toCurrency?.n}.`,
        link: `/${from}/${to}/convert/${amount}`
    };

    return {
        title: meta.title,
        description: meta.description,
        keywords: [`${amount} ${upFrom} to ${upTo}`, `${amount} ${fromCurrency?.n} to ${toCurrency?.n}`],
        alternates: {
            canonical: meta.link,
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: meta.link,
            locale: 'en-US',
            siteName: siteName,
            type: 'website',
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { from, to, amount } = params;
    const upFrom = from.toUpperCase();
    const upTo = to.toUpperCase();
    const fromCurrency = findCurrencyByName(upFrom);
    const toCurrency = findCurrencyByName(upTo);

    const url = `https://currency-converter241.p.rapidapi.com/conversion_rate?from=${upFrom}&to=${upTo}`;
    const url2 = `https://currency-converter241.p.rapidapi.com/conversion_rate?from=${upTo}&to=${upFrom}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b0e5892221msh00c1065eee6f480p178acfjsna850f9150860',
            'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const response2 = await fetch(url2, options);
        const result2 = await response2.json();

        const { rate } = result;
        const currentExchangeNum = rate;
        const currentExchangeStr = getShortForm(currentExchangeNum);

        const generatedRate = getShortForm(amount * currentExchangeNum);


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

        const shortAmount = getShortForm(amount);

        const faqs = [
            {
                q: `What is the exchange rate for ${fromCurrency?.n} to ${toCurrency?.n}?`,
                a: `The current exchange rate for ${fromCurrency?.n} to ${toCurrency?.n} is ${currentExchangeStr}. Means that you can get ${currentExchangeStr} ${to} for One ${from}.`
            },
            {
                q: `How much ${upTo} can I get for ${shortAmount} ${upFrom}?`,
                a: `You can get approximately ${generatedRate} ${upTo} for ${shortAmount} ${from} based on the current exchange rate.`
            },
            {
                q: `How often are exchange rates updated?`,
                a: `Exchange rates are typically updated every 5 - 15 minutes.`
            },
            {
                q: `What factors influence exchange rates?`,
                a: `Exchange rates can be influenced by various factors including interest rates, inflation, economic stability, geopolitical events, and market sentiment.`
            },
        ];

        const currentUrl = `${siteLink}/${from}/${to}/convert/${amount}`


        const title = `${shortAmount} ${upFrom} To  ${upTo}`;

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": currentUrl
            },
            "headline": title,
            "description": `How much is ${amount} ${upFrom} in ${upTo}?, Discover the current exchange rate and convert ${amount} ${fromCurrency?.n} to ${toCurrency?.n}.`,
            "datePublished": currentTime,
            "exchangeRate": {
                "@type": "ExchangeRateSpecification",
                "currencyFrom": upFrom,
                "currencyTo": upTo,
                "exchangeRate": rate,
                "datePublished": currentTime
            },
            "mainEntity": {
                "faqSection": {
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(item => ({
                        "@type": "Question",
                        "name": item.q,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.a
                        }
                    }))
                }
            },
        }




        const firstTexta = `
        As of the current time (${getFormattedDate()}), the exchange rate for 1 ${fromCurrency?.n} (${upFrom})
        is ${currentExchangeStr}  ${toCurrency?.n} (${upTo}), meaning that ${shortAmount} ${upFrom} is equal to ${generatedRate} ${upTo}.`

        const { rate: rate2 } = result2;

        return (
            <article className="w-full md:w-[90%] lg:w-[80%] mx-auto space-y-8">
                <Script
                    id="schema-script"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <HeroComp
                    shortAmount={shortAmount}
                    text={firstTexta}
                    heading={title}
                    from={upFrom} to={upTo} amount={amount} generatedRate={generatedRate} />

                <NextShare link={currentUrl} label={title} />

                <OtherAmounts to={upTo} amount={amount} from={upFrom} />

                <HowTo from={fromCurrency?.n} to={toCurrency?.n} />

                <Faqs arr={faqs} />
                <ConvertionRates rate2={rate2} to={upTo} rate={currentExchangeNum} from={upFrom} />
                <ConvertToOther to={upTo} shortAmount={shortAmount} from={upFrom} />
            </article>
        );
    } catch (error) {
        console.log("error:", error);
        return notFound();
    }
}

