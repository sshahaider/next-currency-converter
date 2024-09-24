import HeroComp from "@/components/HeroComp";

export default async function Home() {

  return (
    <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
      <div className="my-5">
        <HeroComp from="USD" to="CAD" amount={1} />
      </div>
    </div>
  );
}
