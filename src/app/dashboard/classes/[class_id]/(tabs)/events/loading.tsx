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
                  <h2 className="d-card-title flex items-center invisible">
                    Titolo
                  </h2>
                </div>
              </div>
              {/* Description */}
              <p className="opacity-70 text-lg invisible">Desc</p>
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
                <h2 className="d-card-title flex items-center invisible">
                  Titolo
                </h2>
              </div>
            </div>
            <p className="opacity-70 text-lg invisible">Descrizione</p>
            <div className="flex flex-row justify-start space-x-7 opacity-70">
              <span className="flex invisible">
                <i className="bi bi-mortarboard me-1" aria-hidden></i>
                Prof. Name
              </span>
              <span className="flex invisible">
                <i className="bi bi-calendar me-1" aria-hidden></i>
                Date
              </span>
            </div>
          </EventCard>
        ))}
      </EventsTable>
    </>
  );
}
