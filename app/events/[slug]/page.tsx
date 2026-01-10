import EventDetailsPage from "@/components/EventDetailsPage";
import { Suspense } from "react";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailsPage params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetails;
