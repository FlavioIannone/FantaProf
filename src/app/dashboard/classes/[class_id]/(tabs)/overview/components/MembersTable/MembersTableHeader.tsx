"use client";

import { useModal } from "@/components/client/Modal/ModalContext";

export default function MembersTableHeader({ class_id }: { class_id: string }) {
  const modal = useModal();
  return (
    <div className="mb-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold">
        <span className="bi bi-people-fill me-2" aria-hidden></span>
        Membri
      </h1>
      <button
        type="button"
        className="d-btn d-btn-primary"
        onClick={() => {
          // Open modal on button click, using a separate ModalContent component
          modal.setModal(true, {
            title: "Invita un amico",
            content: <ModalContent class_id={class_id} />,
            confirmButtonText: "Copia link",
            onClose: () => {
              // Copy invite link to clipboard on modal close
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/classes/${class_id}/join`
              );
            },
          });
        }}
      >
        <p className="md:block sm:hidden hidden">Invita</p>
        <i className="bi bi-share" aria-hidden></i>
      </button>
    </div>
  );
}

// Separate component for the modal content shown when inviting a friend
const ModalContent = ({ class_id }: { class_id: string }) => {
  return (
    <p>
      Per invitare altri membri, copia il link e invialo a loro:
      <br />
      <code className="break-all">
        {`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/classes/${class_id}/join`}
      </code>
    </p>
  );
};
