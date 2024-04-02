import React from "react";
import * as S from "./styles";


const Button = ({
  children,
  disabled,
  secondary,
  floatRight,
  onClick,

}: any) => {

  return (
    <S.Wrapper
      floatRight={floatRight}
      disabled={disabled}
      secondary={secondary}
      onClick={onClick}

    >
      {children}
    </S.Wrapper>
  );
};

export default Button;
