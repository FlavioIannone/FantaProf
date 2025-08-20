import { admin_firestore } from "@/lib.api/firebase-connection";
import { Class } from "@/lib.api/schema.db";
import EventCard from "./components/EventCard";
import EventsTable from "./components/EventsTable";

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore
    .collection(Class.collection)
    .withConverter(Class.converter)
    .get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

export default async function EventsTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-3.5 justify-between">
        <p className="md:text-3xl text-2xl font-extrabold">Gestione eventi</p>
        <div className="flex md:flex-row flex-col gap-2">
          <button
            type="button"
            className="d-btn d-btn-primary d-btn-soft d-btn-outline d-rounded-box"
          >
            Crea template evento
          </button>
          <button type="button" className="d-btn d-btn-primary d-rounded-box">
            Registra evento
          </button>
        </div>
      </div>
      <EventsTable title="Template disponibili">
        {Array.from({ length: 12 }).map((value, index) => {
          const negative = (index + 1) % 3 === 0;
          return (
            <EventCard key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="d-card-title flex items-center">
                    <span
                      className={`${negative ? "text-error" : "text-success"}`}
                    >
                      <i className="bi bi-circle-fill text-xl" aria-hidden></i>
                    </span>
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
                <button
                  type="button"
                  className="d-btn d-btn-ghost d-rounded-box"
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
              <p className="opacity-70 text-lg">
                Test card n°{index + 1} description
              </p>
            </EventCard>
          );
        })}
      </EventsTable>

      <EventsTable title="Eventi recenti">
        {Array.from({ length: 6 }).map((value, index) => {
          const negative = (index + 1) % 3 === 0;
          return (
            <EventCard key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="d-card-title flex items-center">
                    <span
                      className={`${negative ? "text-error" : "text-success"}`}
                    >
                      <i className="bi bi-circle-fill text-xl" aria-hidden></i>
                    </span>
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
                <button
                  type="button"
                  className="d-btn d-btn-ghost d-rounded-box"
                >
                  <i className="bi bi-pencil"></i>
                </button>
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
