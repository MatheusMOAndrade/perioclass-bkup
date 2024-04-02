import React from "react";
import * as S from "./styles";
import Router from "next/router";

const RedirectButton = ({
  children,
  disabled,
  secondary,
  floatRight,
  onClick,
}: any) => {
  const handleRedirectAction = (redirectUrl: string) => {
    Router.push(redirectUrl != '/login' ? redirectUrl : '/');
  };

  return (
    <S.Wrapper
      floatRight={floatRight}
      disabled={disabled}
      secondary={secondary}
      onClick={() => handleRedirectAction(onClick)}
    >
      {children}
    </S.Wrapper>
  );
};

export default RedirectButton;
