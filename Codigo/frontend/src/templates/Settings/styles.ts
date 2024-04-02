import styled from "styled-components";
import theme from "../../styles/theme";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5vw;
  margin-top: 5vh;
  row-gap: 5vh;
`;

export const SettingsButton = styled.button`
  width: 40px;
  color: white;
  background-color: transparent;
  border: transparent;
  opacity: 0.7
`;
