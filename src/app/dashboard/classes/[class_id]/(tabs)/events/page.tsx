import { admin_firestore } from "@/lib/db/firebase-connection.server";
import { Class } from "@/lib/db/schema.db";
import EventCard from "./components/EventCard/EventCard";
import EventsTable from "./components/EventsTable";
import { getEventTemplates } from "@/lib/data/data-layer/events.data-layer";
import EventsActionButtons from "./components/EventsActionButtons";
import NoDataUI from "../../../../../../components/server/NoDataUI";
import { getStudentEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import EventCardActionButtons from "./components/EventCard/EventCardActionButtons";
import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore.collection(Class.collection).get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

export default async function EventsTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  const [eventTemplates, studentEnrollment, teachers] = await Promise.all([
    getEventTemplates(class_id),
    getStudentEnrollmentData(class_id),
    getClassTeachers(class_id),
  ]);

  const isAdmin = studentEnrollment?.admin ?? false;

  const PointsBadge = ({ points }: { points: number }) => {
    const negative = points < 0;
    return (
      <span
        className={`d-badge ms-2 ${
          negative
            ? "d-badge bg-error/40 text-red-700"
            : "d-badge bg-success/40 text-green-700"
        }`}
      >
        {negative ? "-" : "+"}
        {Math.abs(points)}
        pts
      </span>
    );
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-3.5 justify-between">
        {isAdmin && (
          <EventsActionButtons
            class_id={class_id}
            teachers={teachers}
            eventTemplates={eventTemplates}
          />
        )}
      </div>
      {!eventTemplates || !teachers ? (
        <NoDataUI
          stretch
          message="Si è verificato un problema durante il recupero dei template evento."
        />
      ) : eventTemplates.length === 0 ? (
        <NoDataUI
          stretch
          message="Nessun template evento presente"
          additionalMessage={
            !isAdmin
              ? "Chiedi ad un admin di aggiungerne"
              : "Aggiungi dei template"
          }
        />
      ) : (
        <EventsTable title="Template disponibili">
          {eventTemplates.map((eventTemplate) => {
            return (
              <EventCard key={eventTemplate.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Title */}
                    <h2 className="d-card-title flex items-center">
                      {eventTemplate.title}
                    </h2>
                    {/*  Badge */}
                    <PointsBadge points={eventTemplate.points} />
                  </div>
                  {/* Button */}
                  <EventCardActionButtons
                    class_id={class_id}
                    eventData={eventTemplate}
                  />
                </div>
                {/* Description */}
                <p className="opacity-70 text-lg">
                  {eventTemplate.description}
                </p>
              </EventCard>
            );
          })}
        </EventsTable>
      )}

      <EventsTable title="Eventi recenti">
        {Array.from({ length: 6 }).map((value, index) => {
          const negative = (index + 1) % 3 === 0;
          return (
            <EventCard key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="d-card-title flex items-center">
                    Test card n°{index + 1}
                  </h2>
                  <span
                    className={`d-badge ms-2 ${
                      negative ? "d-badge-error" : "d-badge-success"
                    }`}
                  >
                    {negative ? "-" : "+"}
                    {(index + 1) * 10}
                    pts
                  </span>
                </div>
              </div>
              <p className="opacity-70 text-lg">
                Test card n°{index + 1} description
              </p>
              <div className="flex flex-row justify-start space-x-7 opacity-70">
                <span className="flex">
                  <i className="bi bi-mortarboard me-1"></i>Prof. {index + 1}
                </span>
                <span className="flex">
                  <i className="bi bi-calendar me-1"></i>2025-08-{index + 1}
                </span>
              </div>
            </EventCard>
          );
        })}
      </EventsTable>
    </>
  );
}
