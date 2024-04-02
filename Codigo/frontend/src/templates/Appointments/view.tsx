import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import { usePatientData } from "@/services/api/patient";
import { useFetch } from "@/utils/reactQuery";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/Utils";

import React, { useEffect, useState } from "react";
import { AppointmentWrapper, Block, Divisor } from "./styles";
import Accordion from "../../components/Accordion";
import { ItemDivisor } from "@/components/Accordion/styles";
import useTranslation from "next-translate/useTranslation";

const AppointmentView = () => {
  const { query } = useRouter();
  const { t } = useTranslation("common");
  const [details, setDetails] = useState({ stage: {}, grade: {} });

  const { data: appointmentResult, isLoading: isResultLoading } = useFetch(
    `http://localhost:3000/appointments/result?id=${query.appointmentId}`
  );

  const { data: appointmentData, isLoading: isDataLoading } = useFetch(
    `http://localhost:3000/appointments?id=${query.appointmentId}`
  );

  const { data: patientData, isLoading: isPatientLoading } = useFetch(
    `http://localhost:3000/patients?id=${appointmentData?.patientId}`
  );

  const nowYear = new Date().getFullYear();
  const boneLossPercentage =
    (appointmentData?.data[0].boneLoss / appointmentData?.data[0].boneLenght) *
    100;
  const patientBirth = patientData?.data[0]?.birthDate
    ? new Date(patientData?.data[0]?.birthDate).getFullYear()
    : 0;
  const patientAge = nowYear - patientBirth;

  return (
    <Layout>
      <PageHeader title={t("Diagnósticos")} backAction={"/appointments"} />
      {isResultLoading || isDataLoading || isPatientLoading ? (
        <Loading />
      ) : (
        <AppointmentWrapper>
          <Block>
            <p>
              <b> {appointmentData?.data[0].name} </b>
            </p>
            <p>{formatDate(appointmentData?.data[0].createdAt)}</p>
          </Block>

          <br />
          <Divisor />
          <br />
          <p>
            <b>Resultados</b>
          </p>
          <br />
          <Accordion
            mainInfo={{
              label: "Estágio",
              value: appointmentResult?.data.stage,
            }}
            details={{
              toothLoss: appointmentData?.data[0].toothLoss,
              interdentalCalLoss: appointmentData?.data[0].interdentalCalLoss,
              boneLossPercentage: appointmentData?.data[0].boneLoss
                ? boneLossPercentage
                : 0,
              maximumProbingDepth: appointmentData?.data[0].maximumProbingDepth,
              boneLossType: appointmentData?.data[0].boneLossType,
              boneLenght: appointmentData?.data[0].boneLenght,
              boneLoss: appointmentData?.data[0].boneLoss,
              furcation: appointmentData?.data[0].furcation,
            }}
            id={1}
          />
          <ItemDivisor />
          <br />
          <Accordion
            mainInfo={{ label: "Grau", value: appointmentResult?.data.grade }}
            details={{
              smoking: appointmentData?.data[0].smoking,
              hemoglobineGlycated: appointmentData?.data[0].hemoglobineGlycated,
              lossHistoricalInFiveYears:
                appointmentData?.data[0].lossHistoricalInFiveYears,
              boneLossPercentagePerAge: appointmentData?.data[0].boneLoss
                ? boneLossPercentage / patientAge
                : 0,
            }}
            id={2}
          />

          <br />
          <Divisor />
          <br />
          <p>
            <b>Observações</b>
          </p>
          <Block>
            {appointmentData?.data[0].textBox || "Observações não adicionadas"}{" "}
          </Block>
        </AppointmentWrapper>
      )}
    </Layout>
  );
};

export default AppointmentView;
