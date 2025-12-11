import fetchData from "@/lib/sanity/fetchData";
import ContactMenu from "@/components/ContactMenu"; 

export const revalidate = 60;

export default async function Contact() {
  const contact = await fetchData("contact", {}, "[0]");
  const socialLinks = await fetchData("socialLink");

  return (
    <main className="min-h-screen bg-darker pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-neon-green/5 blur-[150px]" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="flex flex-col justify-between">
            <div className="mt-10">
              <h1 className="mb-8 text-6xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl">
                {contact?.heading || "Let's Create Together."}
              </h1>
              <p className="max-w-md text-xl leading-relaxed text-gray-400">
                {contact?.subheading ||
                  "Have an idea? We'd love to hear from you."}
              </p>
            </div>

            <div className="mt-24 hidden lg:block">
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                  Available for Work
                </span>
              </div>

              <div className="flex gap-8 text-sm text-gray-600 font-mono">
                <p>NSUT, DELHI, INDIA</p>
                <p>{new Date().getFullYear()} © JUNOON</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="mb-8 text-right">
              <span className="text-xs font-bold uppercase text-neon-green tracking-widest">
                / Socials
              </span>
            </div>
            {socialLinks && <ContactMenu links={socialLinks} />}
          </div>

          <div className="block lg:hidden mt-10">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                Available for Work
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
