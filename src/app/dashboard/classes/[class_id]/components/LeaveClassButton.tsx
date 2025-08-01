"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { getQueryClient } from "@/lib/getQueryClient";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { useRouter } from "next/navigation";

const queryClient = getQueryClient();
export default function LeaveClassButton({ class_id }: { class_id: string }) {
  const { token, loading, error } = useIdToken();
  const router = useRouter();
  const modal = useModal();

  const attemptToLeaveClass = async () => {
    const res = await fetch(`/api/protected/classes/${class_id}/leave`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      router.replace("/dashboard");
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["globalStats"],
      });
    }
  };

  if (loading) {
    return (
      <button
        className="d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1" // md:default button padding
        type="button"
        disabled
      >
        <p className="md:block hidden">Esci dalla classe</p>
        <i
          className="bi bi-box-arrow-right md:text-3xl text-2xl"
          aria-hidden
        ></i>
      </button>
    );
  }

  return (
    <button
      className="d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1" // md:default button padding
      type="button"
      onClick={() => {
        modal.setModal(true, {
          title: "Lasciare la classe?",
          content: "Confermi di voler lasciare la class?",
          onConfirm: attemptToLeaveClass,
        });
      }}
    >
      <p className="md:block hidden">Esci dalla classe</p>
      <i className="bi bi-box-arrow-right md:text-3xl text-2xl" aria-hidden></i>
    </button>
  );
}
