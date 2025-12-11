import SocialLinks from "@/components/SocialLinks";
import DevCard from "@/components/DevCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pdf from "@/components/Pdf";
import fetchData from "@/lib/sanity/fetchData";
import fetchTeam from "@/lib/sanity/fetchTeam";
import Carousel from "@/components/ui/Carousel";
import ParallaxImage from "@/components/ParallaxImage";
import SpotlightCard from "@/components/SpotlightCard";

export const revalidate = 60;

export default async function About() {
  const team = await fetchTeam();
  await fetchData("team");
  const reels = await fetchData("reel");
  const developers = await fetchData("developer");
  const projects = await fetchData("project");
  const departments = await fetchData("department");

  return (
    <main className="min-h-screen bg-darker pb-20 text-white overflow-x-hidden">
      {/* hero section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute left-0 w-full z-0 -top-12 h-[115%]">
          <ParallaxImage
            image={team.backgroundImage}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-darker" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white drop-shadow-xl md:text-7xl">
            {team.name}
          </h1>
          <p className="mt-4 rounded-full bg-black/30 px-4 py-1 text-xl font-medium text-gray-200 backdrop-blur-sm">
            Faculty Incharge - {team.coordinator}
          </p>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-6xl">
        {/* team */}
        <div className="-mt-20 relative z-20 mb-20">
          <SpotlightCard className="border-white/5 bg-darkest/95 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
            <h4 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Core Team 2024
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {team.members.map((member) => (
                <div
                  key={member._id}
                  className="group relative cursor-default rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm transition-all hover:border-neon-green/50 hover:bg-white/10"
                >
                  <span className="font-bold text-white transition-colors group-hover:text-neon-green">
                    {member.firstName} {member.lastName}
                  </span>
                  <span className="mx-2 text-gray-600">|</span>
                  <span className="text-gray-400">{member.designation}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* developers */}
        {developers && developers.length > 0 && (
          <div className="mb-20">
            <h2 className="mb-16 text-center text-4xl font-bold tracking-tight">
              <span className="text-neon-green">/</span> The Developers
            </h2>
            <div className="relative">
              <div className="absolute -z-10 inset-0 rounded-full bg-neon-green/5 blur-3xl"></div>
              <Carousel>
                {developers.map((developer) => (
                  <DevCard key={developer._id} developer={developer} />
                ))}
              </Carousel>
            </div>
          </div>
        )}

        {/* projects */}
        <div className="mb-32">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-10 w-2 bg-neon-green"></div>
            <h2 className="text-4xl font-bold text-white">Our Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <SpotlightCard
                key={project._id}
                className="h-full bg-darkest p-8 transition-colors hover:bg-white/5"
              >
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {project.name}
                </h3>
                <div className="h-1 w-12 bg-white/20 mb-4"></div>
                <p className="text-sm leading-7 text-gray-400">
                  {project.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* departments */}
        <div className="mb-32">
          <div className="mb-12 flex items-center justify-end gap-4 text-right">
            <h2 className="text-4xl font-bold text-white">Departments</h2>
            <div className="h-10 w-2 bg-neon-green"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {departments.map((department) => (
              <SpotlightCard
                key={department._id}
                className="h-full bg-darkest p-8 transition-colors hover:bg-white/5"
              >
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {department.name}
                </h3>
                <div className="h-1 w-12 bg-white/20 mb-4"></div>
                <p className="text-sm leading-7 text-gray-400">
                  {department.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* reels */}
        {reels.pdf && (
          <div className="mb-20">
            <Pdf doc={reels.pdf.asset} />
          </div>
        )}
      </div>
    </main>
  );
}
