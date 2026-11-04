import { Cover } from "@/components/home/Cover";
import { MainProject } from "@/components/home/MainProject";

export default function HomePage() {
  return (
    <main className="page-x">
      <Cover />
      <div className="border-t border-rule">
        <MainProject />
      </div>
    </main>
  );
}
