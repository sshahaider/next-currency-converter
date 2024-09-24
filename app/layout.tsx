import "./globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import Header from "@/components/header"
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google"
import { domain, siteLink, siteName } from "@/config";

const montserrat = Montserrat({
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

const meta = {
	title: 'Next.Js Currency Converter',
	dec: "An Online Currency Converter Build With Next.Js Tailwind CSS Shadcn UI",
	link: "/"
}


export const metadata: Metadata = {
	title: meta.title,
	description: meta.dec,
	metadataBase: new URL(siteLink),
	applicationName: siteName,
	keywords: [siteName, domain, "Currency Converter"],
	publisher: siteName,
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
	},
	alternates: {
		canonical: meta.link,
	},
	openGraph: {
		title: meta.title,
		description: meta.dec,
		url: meta.link,
		locale: 'en-US',
		siteName,
		type: 'website',
	},
}
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {


	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={clsx(
					"min-h-screen bg-transperent antialiased",
					montserrat.className
				)}
			>
				<div className="relative flex flex-col">
					<Header />
					<main className="w-full min-h-screen mx-auto py-16 px-2 md:px-5 lg:px-10 flex-grow">
						{children}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
