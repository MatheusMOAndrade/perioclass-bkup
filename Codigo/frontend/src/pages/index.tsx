import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import Router from "next/router";

export default function Home() {
  useEffect(() => {
    Router.push("/dashboard");
  }, []);
  return <Layout>carregando</Layout>;
}
