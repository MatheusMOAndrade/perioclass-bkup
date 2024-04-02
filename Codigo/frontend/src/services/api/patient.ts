import { useMultimethodMutation } from "@/utils/reactQuery";
import Router from "next/router";
import toast from "react-hot-toast";
import apiRoutes from "../routes";
import useTranslation from "next-translate/useTranslation";

export const usePatientData = () => {
  const patientMutation = useMultimethodMutation(apiRoutes.patient.base);
  const patientByIdMutation = useMultimethodMutation(
    apiRoutes.patient.patientById,
    apiRoutes.patient.base
  );

  const { t } = useTranslation("common");

  const handleAdd = (
    name: string,
    email: string,
    birth_date: string,
    city: string,
    state: string,
    district: string,
    country: string,
    gender: string
  ) => {
    patientMutation.mutate(
      {
        data: { name, email, birth_date, city, state, district, country, gender },
        method: "POST",
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t("Cadastro realizado com sucesso."));
          Router.push("/patient");
        },
        onError: (err: any) => {
          toast.error(t("Erro"));
        },
      }
    );
  };

  const handleEdit = (
    patientId: number,
    name: string,
    email: string,
    birth_date: string,
    city: string,
    state: string,
    district: string,
    country: string,
    gender: string
  ) => {
    patientByIdMutation.mutate(
      {
        data: { name, email, birth_date, city, state, district, country, gender },
        method: "PUT",
        additionalQuery: String(patientId),
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t("Atualização realizada com sucesso."));
        },
        onError: (err: any) => {
          toast.error(t("Erro ao atualizar."));
        },
      }
    );
  };

  const handleDelete = (patientId: number) => {
    patientByIdMutation.mutate(
      { method: "DELETE", additionalQuery: String(patientId) },
      {
        onSuccess: () => {
          toast.success(t("Paciente excluido com sucesso"));
        },
        onError: () => {
          toast.error(t("Erro"));
        },
      }
    );
  };

  const handleRead = () => { };

  return { handleAdd, handleEdit, handleDelete, handleRead };
};
