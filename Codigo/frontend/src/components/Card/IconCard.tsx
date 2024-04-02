import React from "react";
import Button from "../Button";
import * as S from "./styles";
import Router from "next/router";
// import { Delete } from "@styled-icons/fluentui-system-regular/Delete";

const IconCard = ({ children, onClick, icon, title }) => {
  const handleRedirectAction = (redirectUrl: string) => {
    if (redirectUrl === "/login") {
      window.sessionStorage.clear();
    }
    Router.push(redirectUrl);
  };

  return (
    <S.CardContainer onClick={() => handleRedirectAction(onClick)}>
      {!!icon && <S.CardIcon>{icon}</S.CardIcon>}
      {/* <S.CardIcon src={icon} /> */}
      <S.DashboardCardTitle>{title}</S.DashboardCardTitle>
    </S.CardContainer>
  );
};

export default IconCard;
