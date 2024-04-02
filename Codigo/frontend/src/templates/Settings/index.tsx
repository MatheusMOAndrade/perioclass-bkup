import IconCard from "@/components/Card/IconCard";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import React from "react";
import * as S from "./styles";
import { PersonFill } from "@styled-icons/bootstrap/PersonFill";
import { LogOut } from "@styled-icons/boxicons-regular/LogOut";
import useTranslation from "next-translate/useTranslation";

const Settings = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <PageHeader title="Configurações" backAction={"/dashboard"} />
      <S.CardWrapper>
        <IconCard
          title={t("Editar Usuário")}
          onClick={"/settings/user"}
          icon={<PersonFill />}
        ></IconCard>
        <IconCard title="Sair" onClick={"/login"} icon={<LogOut />}></IconCard>
      </S.CardWrapper>
    </Layout>
  );
};

export default Settings;
