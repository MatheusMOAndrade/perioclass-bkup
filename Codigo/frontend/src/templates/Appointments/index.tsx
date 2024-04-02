import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import { usePatientData } from "@/services/api/patient";
import { useFetch } from "@/utils/reactQuery";
import Router from "next/router";
import React from "react";
import CardList from "@/components/CardList/CardList";
import useTranslation from "next-translate/useTranslation";

const AppointmentList = () => {
  const { data, isLoading } = useFetch("http://localhost:3000/appointments");
  const { handleDelete } = usePatientData();

  const { t } = useTranslation("common");

  const handleEditPatient = (appointmentId: number) => {
    Router.push(`/patient/${appointmentId}/edit`);
  };

  const deletePatient = (appointmentId: number) => {
    handleDelete(appointmentId);
  };

  const handleClick = (appointmentId: number) => {
    Router.push(`/appointments/${appointmentId}`);
  };

  return (
    <Layout>
      <PageHeader
        title={t("Diagnósticos")}
        backAction={"/dashboard"}
        redirectAction={"/appointments/new"}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <CardList
          title={t("Diagnósticos")}
          data={data?.data}
          //   onEdit={handleEditPatient}
          //   onDelete={deletePatient}
          onClick={handleClick}
        />
      )}
    </Layout>
  );
};

export default AppointmentList;
