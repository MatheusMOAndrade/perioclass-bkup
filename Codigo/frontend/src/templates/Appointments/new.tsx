import Button from "@/components/Button";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import TextField from "@/components/TextField";
import { VSpace } from "@/components/VSpace/styles";
import router, { useRouter } from "next/router";
import * as S from "./styles";
import Stepper from "@/components/Stepper";
import { useState } from "react";
import { useFormTemplate } from "@/hooks/useForm";
import AsyncDropdownSingle from "@/components/Dropdown/AsyncDropdownSingle";
import apiRoutes from "@/services/routes";
import { useAppointmentsData } from "@/services/api/appointments";
import BasicDropdownSingle from "@/components/Dropdown/BasicDropdownSingle";
import useTranslation from "next-translate/useTranslation";

const defaultValues = {
  tooth_loss: 0,
  interdental_cal_loss: 0,
  maximum_probing_depth: 0,
  furcation: "none",
  bone_lenght: 0,
  bone_loss: 0,
  bone_loss_type: "none",
  smoking: "0",
  hemoglobine_glycated: "0",
  loss_historical_in_five_years: 0,
  extension: "<30%",
  text_box: "",
  biofilm: "incompatible",
  patient_id: 0,
};

const Appointments = () => {
  const { handleAdd, handleEdit } = useAppointmentsData();
  const { query } = useRouter();
  const { values, handleChange, setValues } = useFormTemplate(
    defaultValues,
    {}
  );

  const { t } = useTranslation("common");

  const onSubmit = () => {
    handleAdd(values);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout>
      <PageHeader
        backAction={"/appointments"}
        title={t("Registrar diagnóstico")}
        redirectAction={""}
        endAdornment={""}
      />
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <S.FieldWrapper>
          <VSpace height={40} />
          <AsyncDropdownSingle
            endpoint={apiRoutes.patient.base}
            onDropdownChange={handleChange("patient_id")}
          />

          <VSpace height={20} />
          <Button onClick={handleNext}>{t("Próximo")}</Button>
        </S.FieldWrapper>
      )}

      {currentStep === 2 && (
        <S.FieldWrapper>
          <VSpace height={40} />
          <TextField
            label={t("Quantidade de dentes perdidos")}
            value={values.tooth_loss}
            onChange={handleChange("tooth_loss")}
          />
          <TextField
            label={t("Perda inserção interproximal")}
            value={values.interdental_cal_loss}
            onChange={handleChange("interdental_cal_loss")}
          />
          <TextField
            label={t("Profundidade da sondagem")}
            value={values.maximum_probing_depth}
            onChange={handleChange("maximum_probing_depth")}
          />
          <BasicDropdownSingle
            label={t("Tipo de perda óssea")}
            placeholder={t("Selecione um valor")}
            initialValue={values.bone_loss_type?.length > 0 ? values.bone_loss_type : null}
            mainkey="label"
            data={[
              { label: "Sem perda", value: "none" },
              {
                label: "Predominantemente horizontal",
                value: "Mostly horizontal bone loss.",
              },
              {
                label: "Predominantemente Vertical (>=3mm)",
                value: "Vertical bone loss.",
              },
            ]}
            onDropdownChange={handleChange("bone_loss_type")}
          />
          <TextField
            label={t("Tamanho ósseo total")}
            value={values.bone_lenght}
            onChange={handleChange("bone_lenght")}
          />
          <TextField
            label={t("Perda óssea")}
            value={values.bone_loss}
            onChange={handleChange("bone_loss")}
          />
          <BasicDropdownSingle
            label={t("Lesão de furca")}
            placeholder="Selecione um valor"
            initialValue={values.furcation?.length > 0 ? values.furcation : null}
            mainkey="label"
            data={[
              { label: "Sem lesão", value: "none" },
              { label: "Classe 1", value: "class1" },
              { label: "Classe 2", value: "class2" },
              { label: "Classe 3", value: "class3" },
            ]}
            onDropdownChange={handleChange("furcation")}
          />
          <VSpace height={20} />
          <S.ButtonWrapper>
            <Button onClick={handlePrevious}>{t("Anterior")}</Button>
            <Button onClick={handleNext}>{t("Próximo")}</Button>
          </S.ButtonWrapper>
        </S.FieldWrapper>
      )}

      {currentStep === 3 && (
        <S.FieldWrapper>
          <VSpace height={40} />
          <BasicDropdownSingle
            label={t("Tabagismo")}
            placeholder="Selecione um valor"
            initialValue={values.smoking?.length > 0 ? values.smoking : null}
            mainkey="label"
            data={[
              { label: "Não fumante", value: "0" },
              { label: "Menos de 10 cigarros/dia", value: "<10" },
              { label: "10 ou mais cigarros/dia", value: ">=10" },
            ]}
            onDropdownChange={handleChange("smoking")}
          />
          <BasicDropdownSingle
            label={t("Hbglicada (diabetes)")}
            placeholder="Selecione um valor"
            initialValue={values.hemoglobine_glycated?.length > 0 ? values.hemoglobine_glycated : null}
            mainkey="label"
            data={[
              { label: "Não diabético", value: "0" },
              { label: "Menos de 7%", value: "<7%" },
              { label: "7% ou mais", value: ">=7%" },
            ]}
            onDropdownChange={handleChange("hemoglobine_glycated")}
          />
          <TextField
            label={t("Historico de perda dos últimos 5 anos")}
            value={values.loss_historical_in_five_years}
            onChange={handleChange("loss_historical_in_five_years")}
          />
          <BasicDropdownSingle
            label={t("Biofilme")}
            placeholder="Selecione um valor"
            initialValue={values.biofilm?.length > 0 ? values.biofilm : null}
            mainkey="label"
            data={[
              { label: "Incompatível", value: "incompatible" },
              { label: "Compatível", value: "compatible" },
            ]}
            onDropdownChange={handleChange("biofilm")}
          />
          <VSpace height={20} />
          <S.ButtonWrapper>
            <Button onClick={handlePrevious}>{t("Anterior")}</Button>
            <Button onClick={handleNext}>{t("Próximo")}</Button>
          </S.ButtonWrapper>
        </S.FieldWrapper>
      )}
      {currentStep === 4 && (
        <S.FieldWrapper>
          <VSpace height={40} />
          <TextField
            label={t("Observações")}
            value={values.text_box}
            onChange={handleChange("text_box")}
          />
          <BasicDropdownSingle
            label={t("Extensão")}
            placeholder="Selecione um valor"
            initialValue={values.extension?.length > 0 ? values.extension : null}
            mainkey="label"
            data={[
              { label: "Menos de 30%", value: "<30%" },
              { label: "30% ou maior", value: ">=30%" },
              {
                label: "Alcança o molar ou o incisivo",
                value: "molar/incisive",
              },
            ]}
            onDropdownChange={handleChange("extension")}
          />
          <VSpace height={20} />
          <S.ButtonWrapper>
            <Button onClick={handlePrevious}>{t("Anterior")}</Button>
            <Button onClick={onSubmit}>{t("Enviar")}</Button>
          </S.ButtonWrapper>
        </S.FieldWrapper>
      )}
    </Layout>
  );
};

export default Appointments;
