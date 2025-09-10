import { admin_firestore } from "@/lib/db/firebase-connection.server";
import { Class } from "@/lib/db/schema.db";
import EventCard from "./components/EventCard/EventCard";
import EventsTable from "./components/EventsTable";
import {
  getEventRegistrations,
  getEventTemplates,
} from "@/lib/data/data-layer/events.data-layer";
import EventsActionButtons from "./components/EventsActionButtons";
import NoDataUI from "../../../../../../components/server/NoDataUI";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import EventCardActionButtons from "./components/EventCard/EventCardActionButtons";
import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";
import { formatDateToDDMMYYYY } from "@/lib/data/types.data";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import PointsBadge from "@/components/server/PointsBadge";
import Link from "next/link";
import { getRandomAmazonAd } from "@/lib/types";
import AmazonAdJoinRow from "@/components/client/Ads/AmazonAdJoinRow";

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
  const [eventRegistrations, eventTemplates, studentEnrollmentRes, teachers] =
    await Promise.all([
      getEventRegistrations(class_id),
      getEventTemplates(class_id),
      getCurrentUserEnrollmentData(class_id),
      getClassTeachers(class_id),
    ]);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  const isAdmin = studentEnrollmentRes.data.admin;

  const renderEventRegistrationUI = (): ReactNode => {
    if (eventRegistrations.status !== 200 || teachers.status !== 200) {
      // Handle errors / missing data first
      if (eventRegistrations.status === 404) {
        return (
          <NoDataUI
            shrink
            message="Nessun evento registrato"
            additionalMessage={
              !isAdmin
                ? "Chiedi ad un admin di registrarne"
                : "Registra un evento"
            }
          />
        );
      }
      return (
        <NoDataUI
          shrink
          message="Si è verificato un problema durante il recupero degli eventi registati."
        />
      );
    }

    // Successful case: render the table
    return (
      <EventsTable>
        {eventRegistrations.data.map((registration) => {
          return (
            <div
              className="d-join-vertical d-card md:d-card-md border border-base-300 shadow-md d-card-sm"
              key={registration.registration_id}
            >
              <EventCard key={registration.registration_id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="d-card-title flex items-center">
                      {registration.title}
                    </h2>
                    <PointsBadge points={registration.points} />
                  </div>
                </div>
                <p className="opacity-70 text-lg">{registration.description}</p>
                <div className="flex flex-row justify-start space-x-3 opacity-70">
                  <span className="flex">
                    <i className="bi bi-mortarboard me-1" aria-hidden></i>
                    Prof. {registration.teacher_name}
                  </span>
                  <span className="flex">
                    <i className="bi bi-calendar me-1" aria-hidden></i>
                    {formatDateToDDMMYYYY(registration.created_at)}
                  </span>
                </div>
              </EventCard>
              <AmazonAdJoinRow />
            </div>
          );
        })}
      </EventsTable>
    );
  };

  const renderEventTemplatesUI = (): ReactNode => {
    if (eventTemplates.status !== 200) {
      // Handle errors / missing data first
      if (eventTemplates.status === 404) {
        return (
          <NoDataUI
            shrink
            message="Nessun template evento presente"
            additionalMessage={
              !isAdmin
                ? "Chiedi ad un admin di aggiungerne"
                : "Aggiungi dei template"
            }
          />
        );
      }
      return (
        <NoDataUI
          shrink
          message="Si è verificato un problema durante il recupero dei template evento."
        />
      );
    }

    // Successful case: render the table
    return (
      <EventsTable>
        {eventTemplates.data.map((eventTemplate) => {
          return (
            <div
              className="d-join-vertical d-card md:d-card-md border border-base-300 shadow-md d-card-sm"
              key={eventTemplate.event_id}
            >
              <EventCard>
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
                  {isAdmin && (
                    <EventCardActionButtons
                      class_id={class_id}
                      eventData={eventTemplate}
                    />
                  )}
                </div>
                {/* Description */}
                <p className="opacity-70 text-lg">
                  {eventTemplate.description}
                </p>
              </EventCard>
              <AmazonAdJoinRow />
            </div>
          );
        })}
      </EventsTable>
    );
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-3.5 justify-between">
        {isAdmin && (
          <EventsActionButtons
            class_id={class_id}
            teachers={teachers.status !== 200 ? [] : teachers.data}
            eventTemplates={
              eventTemplates.status !== 200 ? [] : eventTemplates.data
            }
          />
        )}
      </div>
      {/* Event templates table */}
      <h2 className="md:text-3xl text-2xl font-extrabold mt-5">
        Template disponibili
      </h2>
      {renderEventTemplatesUI()}

      {/* Event registrations table */}
      <h2 className="md:text-3xl text-2xl font-extrabold mt-5">
        Eventi recenti
      </h2>
      {renderEventRegistrationUI()}
    </>
  );
}
