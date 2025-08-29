"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { joinClassAction } from "@/lib/data/actions/classes.actions";
import { Class } from "@/lib/db/schema.db";
import { ReadOperationResult } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import z from "zod";

export default function JoinClassComponent({
  class_id,
  classData,
}: {
  class_id: string;
  classData: Promise<
    ReadOperationResult<Pick<z.infer<typeof Class.schema>, "class_name">>
  >;
}) {
  const modal = useModal();
  const toast = useToast();
  const router = useRouter();
  const classRes = use(classData);
  const className = classRes.status !== 200 ? "" : classRes.data.class_name;
  const classJoinedRef = useRef(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const join = async () => {
      if (classJoinedRef.current) {
        return;
      }

      setLoading(true);
      const res = await joinClassAction(class_id);
      if (res.status === 200) {
        router.replace(`/dashboard/classes/${class_id}/overview`);
      } else {
        if (res.status === 404) {
          toast.setToast(true, {
            content: "Questa classe non esiste più.",
            toastType: "error",
          });
        } else if (res.status === 409) {
          modal.setModal(true, {
            title: "Errore durante l'unione alla classe",
            content: "Fai già parte di questa classe.",
            confirmButtonText: "Vai alla classe",
            onClose: () => {
              router.replace(`/dashboard/classes/${class_id}/overview`);
            },
          });
        } else {
          toast.setToast(true, {
            content: "Si è verificato un errore interno.",
            toastType: "error",
          });
        }
      }
      classJoinedRef.current = true;
      setLoading(false);
    };
    join();
  }, [class_id, router, modal]);

  return (
    <>
      <h1>Entrare nella classe {className}</h1>
      {loading && (
        <span className="d-loading d-loading-ring d-loading-xl"></span>
      )}
    </>
  );
}
