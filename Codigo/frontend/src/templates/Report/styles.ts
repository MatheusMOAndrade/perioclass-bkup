import styled from "styled-components";
import theme from "../../styles/theme";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5vw;
  margin-top: 5vh;
`;

export const SettingsButton = styled.button`
  width: 40px;
  color: white;
  background-color: transparent;
  border: transparent;
  opacity: 0.7
`;


export const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 14rem;
  border-bottom: 1px solid var(--neutral-cream);
  padding: 1.5rem 0;
`;


export const Title = styled.div`
  position: relative;
  color: white;
  width: 100%;
  height: 1rem;
`;
