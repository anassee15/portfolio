import { Cover } from "@/components/home/Cover";
import { MainProject } from "@/components/home/MainProject";
import { Path } from "@/components/home/Path";

export default function HomePage() {
  return (
    <main className="page-x">
      <Cover />
      <div className="border-t border-rule">
        <Path />
        <MainProject />
      </div>
    </main>
  );
}
