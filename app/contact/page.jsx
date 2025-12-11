import SocialLinks from "@/components/SocialLinks";
import fetchData from "@/lib/sanity/fetchData";
import SpotlightCard from "@/components/SpotlightCard";

export const revalidate = 60;

export default async function Contact() {
  const contact = await fetchData("contact", {}, "[0]");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-darker px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl">
        <SpotlightCard
          className="bg-darkest/80 border border-white/10 p-12 text-center shadow-2xl backdrop-blur-xl md:p-20"
          spotlightColor="rgba(156, 205, 126, 0.2)"
        >
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-neon-green shadow-[0_0_15px_rgba(156,205,126,0.5)]" />

          <h1 className="mb-8 text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
            {contact.heading}
          </h1>

          <h4 className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed text-gray-400">
            {contact.subheading}
          </h4>

          <div className="inline-block rounded-3xl border border-white/5 bg-white/5 px-10 py-8 transition-all hover:border-neon-green/30 hover:bg-white/10">
            <SocialLinks
              containerStyle="grid-flow-row md:grid-flow-col gap-12 md:gap-24"
              iconStyle="w-10 h-10 mb-3 text-white transition-all duration-300 hover:scale-110 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              lg
              showText
            />
          </div>
        </SpotlightCard>
      </div>
    </main>
  );
}
