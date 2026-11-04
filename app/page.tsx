import { Contact } from "@/components/home/Contact";
import { Cover } from "@/components/home/Cover";
import { MainProject } from "@/components/home/MainProject";
import { MoreWork } from "@/components/home/MoreWork";
import { Profile } from "@/components/home/Profile";
import { SelectedWork } from "@/components/home/SelectedWork";

export default function HomePage() {
  return (
    <main className="page-x">
      <Cover />
      <div className="border-t border-rule">
        <Profile />
        <MainProject />
        <SelectedWork />
        <MoreWork />
        <Contact />
      </div>
    </main>
  );
}
