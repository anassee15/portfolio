import { Contact } from "@/components/home/Contact";
import { Cover } from "@/components/home/Cover";
import { Profile } from "@/components/home/Profile";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";

export default function HomePage() {
  return (
    <main className="page-x">
      <Cover />
      <div className="border-t border-rule">
        <Profile />
        <ProjectsTeaser />
        <Contact />
      </div>
    </main>
  );
}
