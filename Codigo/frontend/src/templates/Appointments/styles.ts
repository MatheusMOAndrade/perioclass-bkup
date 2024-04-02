import styled from "styled-components";
import theme from "../../styles/theme";

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 2rem;
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
`;

export const AppointmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.secondaryBlue};
  border-radius: 5px;
  padding: 16px;
  width: 100%;
  height: auto;
  color: white;
`;

export const Block = styled.div`
  font-size: 16px;
  margin-top: 7px;
  p{
    margin-top: 10px;
    font-size: 22px;
  }
 
`

export const Divisor = styled.hr`
  color: ${theme.colors.primaryBlue};
  border: 2px solid ${theme.colors.primaryBlue};
  margin: 8px 0 8px 0;
`
