import PointsBadge from "@/components/server/PointsBadge";
import EventCard from "./components/EventCard/EventCard";
import EventsTable from "./components/EventsTable";

export default function EventsTabLoading() {
  return (
    <>
      {/* Event templates table */}
      <h2 className="md:text-3xl text-2xl font-extrabold mt-5">
        Template disponibili
      </h2>

      <EventsTable>
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <EventCard key={index} skeleton>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Title */}
                  <h2 className="d-card-title flex items-center w-30 d-skeleton">
                    <p className="invisible">Title</p>
                  </h2>
                  {/*  Badge */}
                  <PointsBadge />
                </div>
              </div>
              {/* Description */}
              <div className="d-skeleton w-full">
                <p className="text-lg invisible">Description</p>
              </div>
            </EventCard>
          );
        })}
      </EventsTable>
      {/* Event registrations table */}
      <h2 className="md:text-3xl text-2xl font-extrabold mt-5">
        Eventi recenti
      </h2>

      <EventsTable>
        {Array.from({ length: 4 }).map((_, index) => (
          <EventCard key={index} skeleton>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="d-card-title flex items-center d-skeleton w-30">
                  <p className="invisible">Title</p>
                </h2>
                <PointsBadge />
              </div>
            </div>
            <div className="text-lg d-skeleton w-full">
              <p className="invisible">Description</p>
            </div>
            <div className="flex flex-row justify-start space-x-3">
              <span className="flex d-skeleton">
                <i className="bi bi-mortarboard me-1 invisible" aria-hidden></i>
                <p className="invisible">Prof. name</p>
              </span>
              <span className="flex d-skeleton">
                <i className="bi bi-calendar me-1 invisible" aria-hidden></i>
                <p className="invisible">DD-MM-YYYY</p>
              </span>
            </div>
          </EventCard>
        ))}
      </EventsTable>
    </>
  );
}
