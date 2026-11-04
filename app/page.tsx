import { Contact } from "@/components/home/Contact";
import { Cover } from "@/components/home/Cover";
import { MainProject } from "@/components/home/MainProject";
import { Profile } from "@/components/home/Profile";

export default function HomePage() {
  return (
    <main className="page-x">
      <Cover />
      <div className="border-t border-rule">
        <Profile />
        <MainProject />
        <Contact />
      </div>
    </main>
  );
}
