import React, { useState } from "react";
import * as S from "./styles";

const TextField = ({
  elsize = "large",
  label,
  onChange,
  value,
  error,
  readOnly,
  sufix,
  ...props
}: any) => {
  return (
    <S.Wrapper error={!!error} elsize={elsize}>
      {!!label && <S.Label>{label}</S.Label>}
      <S.InputWrapper>
        <S.Input
          {...props}
          onChange={onChange}
          value={value}
          readonly={!!readOnly}
          sufix={sufix}
        />
      </S.InputWrapper>
      {error !== "onlyborder" && !!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default TextField;
