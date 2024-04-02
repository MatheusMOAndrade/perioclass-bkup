import Button from "@/components/Button";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import TextField from "@/components/TextField";
import { VSpace } from "@/components/VSpace/styles";
import { useFormTemplate } from "@/hooks/useForm";
import { useRouter } from "next/router";
import * as S from "./styles";
import { usePatientData } from "@/services/api/patient";
import apiRoutes from "@/services/routes";
import { useFetch } from "@/utils/reactQuery";
import Loading from "@/components/Loading";
import Radio from "@/components/Radio";
import BasicDropdownSingle from "@/components/Dropdown/BasicDropdownSingle";
import useTranslation from "next-translate/useTranslation";

const defaultValues = {
  name: "",
  email: "",
  birth_date: "",
  district: "",
  city: "",
  state: "",
  country: "",
  gender: "male",
};

const RegisterPatient = () => {
  const { handleAdd, handleEdit } = usePatientData();
  const { query } = useRouter();

  const { t } = useTranslation("common");

  const { values, handleChange, setValues } = useFormTemplate(
    defaultValues,
    {}
  );

  let { isLoading } = useFetch(
    query.patientId ? apiRoutes.patient.patientById + query.patientId : null,
    {},
    {
      onSuccess: ({ data }: any) => {
        setValues({ ...data[0], birth_date: data[0].birthDate.split("T")[0] });
      },
    }
  );

  const testToast = () => {
    query.patientId
      ? handleEdit(
        String(query.patientId),
        values.name,
        values.email,
        values.birth_date,
        values.city,
        values.state,
        values.district,
        values.country,
        values.gender
      )
      : handleAdd(
        values.name,
        values.email,
        values.birth_date,
        values.city,
        values.state,
        values.district,
        values.country,
        values.gender
      );
  };

  console.log("XABLAU22", values);

  return (
    <Layout>
      <PageHeader backAction={"/patient"} title={t("Registrar paciente")} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TextField
            label={t("Nome")}
            value={values.name}
            onChange={handleChange("name")}
          />

          <TextField
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            type="date"
            label={t("Data de Nascimento")}
            value={values.birth_date}
            onChange={handleChange("birth_date")}
          />
          <div style={{ padding: 10, display: "flex" }}>
            <Radio
              label={t("Masculino")}
              labelFor="Masculino"
              id="Masculino"
              name="sexo"
              value={values.gender}
              defaultChecked
              onChange={() => handleChange("gender")("male")}
            />
            <Radio
              label={t("Feminino")}
              labelFor="Feminino"
              id="Feminino"
              name="sexo"
              value={values.gender}
              onChange={() => handleChange("gender")("female")}
            />
          </div>
          <div style={{ padding: 10 }}></div>
          <S.TextFieldWrapper>
            <BasicDropdownSingle
              label={t("País")}
              placeholder="..."
              initialValue={values.country}
              mainkey="label"
              data={[{ label: "Brasil", value: "BRA" }]}
              onDropdownChange={handleChange("country")}
            />

            <BasicDropdownSingle
              label={t("Estado")}
              placeholder="..."
              initialValue={values.state}
              mainkey="label"
              data={estadosBrasileiros}
              onDropdownChange={handleChange("state")}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              label={t("Cidade")}
              value={values.city}
              onChange={handleChange("city")}
            />
            <TextField
              label={t("Bairro")}
              value={values.district}
              onChange={handleChange("district")}
            />
          </S.TextFieldWrapper>

          <VSpace height={40} />
          <Button onClick={testToast}>{t("Enviar")}</Button>
        </>
      )}
    </Layout>
  );
};

export default RegisterPatient;

const estadosBrasileiros = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];
