import React, { useState } from "react";
import * as S from "./styles";
import Router from "next/router";

const PageHeader = ({
  title,
  redirectAction,
  backAction,
  endAdornment,
  additionalAdornment,
}) => {
  const handleRedirectAction = (redirectUrl: string) => {
    Router.push(redirectUrl);
  };

  return (
    <S.Wrapper>
      <S.LWrapper>
        {!!backAction && (
          <S.Back onClick={() => handleRedirectAction(backAction)}>
            {"<"}
          </S.Back>
        )}

        <S.Title>{title}</S.Title>
      </S.LWrapper>

      <div>
        {!!redirectAction && (
          <S.Add onClick={() => handleRedirectAction(redirectAction)}>
            {!!endAdornment ? endAdornment : "+"}
          </S.Add>
        )}

        <S.Add>{!!additionalAdornment && additionalAdornment}</S.Add>
      </div>
    </S.Wrapper>
  );
};

export default PageHeader;
