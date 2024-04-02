import Button from "@/components/Button";
import RedirectButton from "@/components/Button/RedirectButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { VSpace } from "@/components/VSpace/styles";
import { useFormTemplate } from "@/hooks/useForm";
import { useAuthenticate } from "@/services/api/login";
import Router from "next/router";
import toast from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { values, handleChange } = useFormTemplate(defaultValues, {});

  const { handleLogin, handleLogout, handleForgotPassword } = useAuthenticate();

  const login = async () => {
    handleLogin(values.email, values.password);
  };

  const { t } = useTranslation("common");

  return (
    <Layout>
      <TextField
        label="Email"
        value={values.email}
        onChange={handleChange("email")}
      />
      <TextField
        label={t("Senha")}
        type="password"
        value={values.password}
        onChange={handleChange("password")}
      />
      <Button onClick={login}>{t("Entrar")}</Button>
      <VSpace height={16}></VSpace>
      <RedirectButton onClick={"/user/new"}>Nova conta</RedirectButton>
    </Layout>
  );
};

export default Login;
