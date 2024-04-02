import IconCard from "@/components/Card/IconCard";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Settings2Outline } from "@styled-icons/evaicons-outline/Settings2Outline";
import setLanguage from "next-translate/setLanguage";
//import DiagnosisIcon from "@/assets/diagnosis_icon.png";
import router from "next/router";
import * as S from "./styles";
import useTranslation from "next-translate/useTranslation";
import { Language } from "@styled-icons/ionicons-outline/Language";
import { HeartPulse } from "@styled-icons/remix-fill/HeartPulse";
import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";
import { BarGraph } from "@styled-icons/entypo/BarGraph";

const Dashboard = () => {
  const { t } = useTranslation("common");
  const { lang } = useTranslation();

  function _handleClick() {
    router.back();
  }
  const userName = window.sessionStorage.getItem("userName");

  return (
    <Layout>
      <PageHeader
        onBack={_handleClick}
        title={`${t("Olá")}, ${userName}`}
        redirectAction={"/settings"}
        endAdornment={
          <S.ButtonsWrapper>
            <S.SettingsButton>
              <Settings2Outline />
            </S.SettingsButton>
          </S.ButtonsWrapper>
        }
        additionalAdornment={
          <S.SettingsButton
            onClick={async () => await setLanguage(lang == "en" ? "pt" : "en")}
          >
            <Language />
            <span>{lang == "en" ? "EN" : "PT"}</span>
          </S.SettingsButton>
        }
      />

      <S.CardWrapper>
        <IconCard
          title={t("Pacientes")}
          onClick={"/patient"}
          icon={<PeopleFill />}
        ></IconCard>

        <IconCard
          title={t("Diagnósticos")}
          onClick={"/appointments"}
          icon={<HeartPulse />}
        ></IconCard>
      </S.CardWrapper>

      <S.CardWrapper>
        <IconCard
          title={t("Dashboard")}
          onClick={"/report"}
          icon={<BarGraph />}
        ></IconCard>
      </S.CardWrapper>
    </Layout>
  );
};

export default Dashboard;
