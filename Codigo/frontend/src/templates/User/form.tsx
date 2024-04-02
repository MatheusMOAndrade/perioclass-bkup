import Button from "@/components/Button";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import TextField from "@/components/TextField";
import { VSpace } from "@/components/VSpace/styles";
import { useFormTemplate } from "@/hooks/useForm";
import { useUserData } from "@/services/api/user";
import apiRoutes from "@/services/routes";
import { useFetch } from "@/utils/reactQuery";
import Loading from "@/components/Loading";
import { UserRequest } from "@/types/User";
import useTranslation from "next-translate/useTranslation";

const defaultValues: UserRequest = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

const RegisterUser = () => {
  const { handleAdd, handleEdit } = useUserData();
  const userId = window.sessionStorage.getItem("userId");
  const backPage = userId ? "/settings" : "/login";

  const { values, handleChange, setValues } = useFormTemplate(
    defaultValues,
    {}
  );

  const { t } = useTranslation("common");

  let { isLoading } = useFetch(
    userId ? apiRoutes.user.userById + userId : null,
    {},
    {
      onSuccess: ({ data }: any) => {
        setValues({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      },
    }
  );

  const testToast = () => {
    userId
      ? handleEdit(
          String(userId),
          values.name,
          values.email,
          values.phone,
          values.password
        )
      : handleAdd(values.name, values.email, values.phone, values.password);
  };

  return (
    <Layout>
      <PageHeader backAction={backPage} title={t("Registrar usuário")} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TextField
            label="Nome"
            value={values.name}
            onChange={handleChange("name")}
          />
          <TextField
            label="Celular"
            value={values.phone}
            onChange={handleChange("phone")}
          />
          <TextField
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            label={t("Senha")}
            value={values.password}
            onChange={handleChange("password")}
          />

          <VSpace height={40} />
          <Button onClick={testToast}>Salvar</Button>
        </>
      )}
    </Layout>
  );
};

export default RegisterUser;
