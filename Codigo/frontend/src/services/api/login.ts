import { useMultimethodMutation } from "@/utils/reactQuery";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import toast from "react-hot-toast";

export const useAuthenticate = () => {
  const authMutation = useMultimethodMutation(
    "http://localhost:3000/auth/login"
  );

  const { t } = useTranslation("common");

  const handleLogin = (email: string, password: string) => {
    authMutation.mutate(
      { data: { email, password }, method: "POST" },
      {
        onSuccess: ({ data }) => {
          console.log(data)
          toast.success(t("Login realizado com sucesso"));
          window.sessionStorage.setItem("sessionToken", data.sessionToken);
          window.sessionStorage.setItem("userName", data.user.name);
          window.sessionStorage.setItem("userId", data.user.id);
          Router.push("/dashboard");
        },
        onError: () => {
          toast.error(t("Erro"));
        },
      }
    );
  };

  const handleLoginPromise = async (email: string, password: string) => {
    try {
      const res = await authMutation.mutateAsync({
        method: "POST",
        data: { email, password },
      });

      return res.data;
    } catch {
      toast.error(t("Erro"));
    }
  };

  const handleLogout = () => { };

  const handleForgotPassword = () => { };

  return {
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleLoginPromise,
  };
};
