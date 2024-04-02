import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import { usePatientData } from "@/services/api/patient";
import { useFetch } from "@/utils/reactQuery";
import Router from "next/router";
import React from "react";
import CardList from "@/components/CardList/CardList";
import useTranslation from "next-translate/useTranslation";

const PatientList = () => {
  const { data, isLoading } = useFetch("http://localhost:3000/patients");
  const { handleDelete } = usePatientData();
  const { t } = useTranslation("common");

  const handleEditPatient = (patientId: number) => {
    Router.push(`/patient/${patientId}/edit`);
  };

  const deletePatient = (patientId: number) => {
    handleDelete(patientId);
  };

  const handleClick = (patientId: number) => {
    Router.push(`/patient/${patientId}`);
  };

  return (
    <Layout>
      <PageHeader
        title={t("Pacientes")}
        backAction={"/dashboard"}
        redirectAction={"/patient/new"}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <CardList
          title={t("Pacientes")}
          data={data?.data}
          onEdit={handleEditPatient}
          onDelete={deletePatient}
          onClick={handleClick}
        />
      )}
    </Layout>
  );
};

export default PatientList;
