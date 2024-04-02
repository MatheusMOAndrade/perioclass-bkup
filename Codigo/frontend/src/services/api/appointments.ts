import { useMultimethodMutation } from "@/utils/reactQuery";
import Router from "next/router";
import toast from "react-hot-toast";
import apiRoutes from "../routes";
import useTranslation from "next-translate/useTranslation";

export const useAppointmentsData = () => {
  const appointmentsMutation = useMultimethodMutation(
    apiRoutes.appointments.base
  );
  const appointmentsByIdMutation = useMultimethodMutation(
    apiRoutes.appointments.appointmentsById,
    apiRoutes.appointments.base
  );

  const { t } = useTranslation("common");

  const handleAdd = (values) => {
    const {
      tooth_loss,
      interdental_cal_loss,
      maximum_probing_depth,
      furcation,
      bone_lenght,
      bone_loss,
      bone_loss_type,
      smoking,
      hemoglobine_glycated,
      loss_historical_in_five_years,
      extension,
      text_box,
      biofilm,
      patient_id,
    } = values;
    appointmentsMutation.mutate(
      {
        data: {
          tooth_loss,
          interdental_cal_loss,
          maximum_probing_depth,
          furcation,
          bone_lenght,
          bone_loss,
          bone_loss_type,
          smoking,
          hemoglobine_glycated,
          loss_historical_in_five_years,
          extension,
          text_box,
          biofilm,
          patient_id,
        },
        method: "POST",
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t("Diagnóstico realizado com sucesso."));
          Router.push(`/appointments/${data.id}`);
        },
        onError: (err: any) => {
          toast.error(t("Erro no cadastro"));
        },
      }
    );
  };

  const handleEdit = (values) => {
    const {
      appointmentsId,
      tooth_loss,
      interdental_cal_loss,
      maximum_probing_depth,
      furcation,
      bone_lenght,
      bone_loss,
      bone_loss_type,
      smoking,
      hemoglobine_glycated,
      loss_historical_in_five_years,
      extension,
      text_box,
      biofilm,
      patient_id,
    } = values;
    appointmentsByIdMutation.mutate(
      {
        data: {
          tooth_loss,
          interdental_cal_loss,
          maximum_probing_depth,
          furcation,
          bone_lenght,
          bone_loss,
          bone_loss_type,
          smoking,
          hemoglobine_glycated,
          loss_historical_in_five_years,
          extension,
          text_box,
          biofilm,
          patient_id,
        },
        method: "PUT",
        additionalQuery: String(appointmentsId),
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t("Atualização realizada com sucesso"));
        },
        onError: (err: any) => {
          toast.error(t("Erro ao atualizar"));
        },
      }
    );
  };

  const handleDelete = (appointmentsId: number) => {
    appointmentsByIdMutation.mutate(
      { method: "DELETE", additionalQuery: String(appointmentsId) },
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
