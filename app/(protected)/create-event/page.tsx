import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateEvent from "@/components/CreateEvent/CreateEvent";

export default async function ProtectedCreateEventPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/create-event");
  }
  return (
    <main className="py-12">
      <CreateEvent />
    </main>
  );
}
