import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useFetch } from "@/utils/reactQuery";
import router from "next/router";
import * as S from "./styles";
import BarChart from "@/components/BarChart";
import Loading from "@/components/Loading";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

const Report = () => {
  function _handleClick() {
    router.back();
  }

  // const now = new Date();
  // const then = new Date();
  // then.setMonth(then.getMonth() - 1);

  // const [startDate, setStartDate] = useState(then);
  // const [endDate, setEndDate] = useState(now);

  const { data, isLoading } = useFetch(`http://localhost:3000/reports`);
  const { t } = useTranslation("common");

  return (
    <Layout>
      {!isLoading ? (
        <>
          {" "}
          <PageHeader
            onBack={_handleClick}
            title={"Dashboard"}
            backAction={"/dashboard"}
          />
          <S.Title>{t("Indice por estágio")}</S.Title>
          <S.CanvasContainer>
            <BarChart
              Data={data}
              barConfig={barConfigEstagio(data.data.global)}
            />
          </S.CanvasContainer>
          <S.Title>{t("Indice por grau")}</S.Title>
          <S.CanvasContainer>
            <BarChart Data={data} barConfig={barConfigGrau(data.data.global)} />
          </S.CanvasContainer>
          <S.Title>{t("Indice por estado")}</S.Title>
          <S.CanvasContainer>
            <BarChart
              Data={data.data.perState}
              barConfig={barConfigEstado(getTopFiveStates(data.data.perState))}
            />
          </S.CanvasContainer>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Report;

const barConfigGrau = (data) => ({
  labels: ["Grau A", "Grau B", "Grau C"],
  datasets: [
    {
      label: "Masculino",
      data: [
        data["male"].count.grade.a,
        data["male"].count.grade.b,
        data["male"].count.grade.c,
      ],
      backgroundColor: "blue",
      color: "white",
      borderRadius: 3,
      borderSkipped: false,
      // hoverBackgroundColor: backgroundSetHover(),
    },
    {
      label: "Feminino",
      data: [
        data["female"].count.grade.a,
        data["female"].count.grade.b,
        data["female"].count.grade.c,
      ],
      backgroundColor: "pink",
      color: "white",
      borderRadius: 3,
      borderSkipped: false,
      // hoverBackgroundColor: backgroundSetHover(),
    },
  ],
});

const barConfigEstado = (topStates) => ({
  labels: [...topStates.states],
  datasets: [
    {
      label: "Masculino",
      data: [...topStates.values.male],
      backgroundColor: "blue",
      color: "white",
      borderRadius: 3,
      borderSkipped: false,
      // hoverBackgroundColor: backgroundSetHover(),
    },
    {
      label: "Feminino",
      data: [...topStates.values.female],
      backgroundColor: "pink",
      color: "white",
      borderRadius: 3,
      borderSkipped: false,
      // hoverBackgroundColor: backgroundSetHover(),
    },
  ],
});

const barConfigEstagio = (data) => {
  return ({
    labels: ["Estagio I", "Estagio II", "Estagio III", "Estagio IV"],
    datasets: [
      {
        label: "Masculino",
        data: [
          data["male"].count.stage.i,
          data["male"].count.stage.ii,
          data["male"].count.stage.iii,
          data["male"].count.stage.iv,
        ],
        backgroundColor: "blue",
        color: "white",
        borderRadius: 3,
        borderSkipped: false,
        // hoverBackgroundColor: backgroundSetHover(),
      },
      {
        label: "Feminino",
        data: [
          data["female"].count.stage.i,
          data["female"].count.stage.ii,
          data["female"].count.stage.iii,
          data["female"].count.stage.iv,
        ],
        backgroundColor: "pink",
        color: "white",
        borderRadius: 3,
        borderSkipped: false,
        // hoverBackgroundColor: backgroundSetHover(),
      },
    ],
  })
};

const getTopFiveStates = (data) => {
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const sumA = data[a].male.total.grade + data[a].male.total.stage;
    const sumB = data[b].male.total.grade + data[b].male.total.stage;
    return sumB - sumA;
  });

  const topStates = sortedKeys.slice(0, 5);

  const a = {
    states: topStates,
    values: {
      male: topStates.map(
        (state) => data[state].male.total.grade + data[state].male.total.stage
      ),
      female: topStates.map(
        (state) =>
          data[state].female.total.grade + data[state].female.total.stage
      ),
    },
  };

  return a;
};

const getDateInterval = (data, startDate, endDate) => { };
