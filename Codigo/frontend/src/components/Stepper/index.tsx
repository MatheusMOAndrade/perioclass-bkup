import React from 'react';
import styled from 'styled-components';
import * as S from "./styles";


const StepperBar = ({ currentStep, totalSteps }) => {
  return (
    <S.Container>
      {Array.from({ length: totalSteps }, (_, index) => (
        <S.Step key={index} active={index + 1 <= currentStep} />
      ))}
    </S.Container>
  );
};

export default StepperBar;