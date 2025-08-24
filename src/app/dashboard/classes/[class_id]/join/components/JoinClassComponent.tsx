"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { joinClassAction } from "@/lib/data/actions/classes.actions";
import { Class } from "@/lib/db/schema.db";
import { use } from "react";
import z from "zod";

export default function JoinClassComponent({class_id, classData }:{class_id:string, classData:Promise<Pick<z.infer<typeof Class.schema>, "class_name"> | undefined>}) {
  const modal = useModal();
  const status =  use(joinClassAction(class_id));

  return <>
  <h1>Entrare nella classe </h1>
  </>
}