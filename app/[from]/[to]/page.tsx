import { redirect } from "next/navigation";

interface PageProps {
    params: { from: string, to: string };
}

export default function Page({ params }: PageProps) {
    const { from, to } = params;

    return redirect(`/${from}/${to.toLowerCase()}/convert/1`)

}

