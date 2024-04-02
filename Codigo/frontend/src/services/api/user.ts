import { useMultimethodMutation } from "@/utils/reactQuery";
import Router from "next/router";
import toast from "react-hot-toast";
import apiRoutes from "../routes";
import useTranslation from "next-translate/useTranslation";

export const useUserData = () => {
  const userMutation = useMultimethodMutation(apiRoutes.user.base);
  const userByIdMutation = useMultimethodMutation(
    apiRoutes.user.userById,
    {},
    apiRoutes.user.base
  );

  const { t } = useTranslation("common");

  const handleAdd = (
    name: string,
    email: string,
    phone: string,
    password: string,

  ) => {
    userMutation.mutate(
      {
        data: { name, email, phone, password },
        method: "POST",
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t("Cadastro realizado com sucesso."));
          Router.push("/login");
        },
        onError: (err: any) => {
          toast.error(t("Erro no cadastro"));
        },
      }
    );
  };

  const handleEdit = (
    userId: string,
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    userByIdMutation.mutate(
      {
        data: { name, email, phone, password },
        method: "PUT",
        additionalQuery: userId,
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

  const handleDelete = (userId: string) => {
    userByIdMutation.mutate(
      { method: "DELETE", additionalQuery: userId },
      {
        onSuccess: () => {
          toast.success(t("Usuário excluido com sucesso"));
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
