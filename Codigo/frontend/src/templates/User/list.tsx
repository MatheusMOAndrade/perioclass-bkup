import Card from "@/components/Card/PatientCard";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import { useUserData } from "@/services/api/user";
import { useFetch } from "@/utils/reactQuery";
import Router from "next/router";
import React from "react";

const UserList = () => {
  const { data, isLoading } = useFetch("http://localhost:3000/user");
  const { handleDelete } = useUserData();
  let userInfo = data?.data;

  const handleEditUser = (userId: string) => {
    Router.push(`/user/${userId}/edit`);
  };

  const deleteUser = (userId: string) => {
    handleDelete(userId);
  };

  return (
    <Layout>
      <PageHeader
        backAction={"/dashboard"}
        title="Usuarios"
        redirectAction={"/user/new"}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Card
          title={userInfo.name}
          onEdit={() => handleEditUser(userInfo.id)}
          onDelete={() => deleteUser(userInfo.id)}
        />
      )}
    </Layout>
  );
};

export default UserList;
