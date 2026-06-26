import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import PlannerWorkspace from "@/components/generators/PlannerWorkspace";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/printables/habit-tracker";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function HabitTrackerPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <PlannerWorkspace type="habit" />
    </PlatformLayout>
  );
}
