import styled, { css } from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.main`
  position: relative;
`;

export const Section = styled.section`
  position: relative;
`;

export const InnerSection = styled.div`
  position: relative;
  max-width: 100%;
  padding: 0;
`;

export const AccordionContainer = styled.div``;

export const AccordionInner = styled.div`
  position: relative;
  width: 100%;
`;

export const AccordionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

export const AccordionTitle = styled.h3`
  margin: 0;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 300;
  width: 100%;
  display: flex;
  font-size: 26px;
  justify-content: space-between;
  ${({ theme }) => css`
    svg {
      width: 32px;
    }
  `}
`;

export const AccordionBody = styled.div`
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;

  ${({ active }) =>
    active &&
    `
      height: auto;
    `}
`;

export const AccordionContent = styled.p`
  margin: 0;
  padding: 0 1rem 1rem;
  height: auto;
`;

export const PuntualDetail = styled.div`
  margin: 10px 0 0 0;
  font-size: 16px;
  display: flex;
  div {
    width: 50%;
  }

  i {
    margin-left: auto;
    text-align: right;
  }
`;

export const ItemDivisor = styled.hr`
  color: ${theme.colors.primaryBlue};
  border: 0.5px solid ${theme.colors.primaryBlue};
  opacity: 0.2;
  margin: 8px 0 8px 0;
`;
