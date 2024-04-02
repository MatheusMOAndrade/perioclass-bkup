import styled from "styled-components";
import { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.darkBlue};
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const AppBox = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBlue};
    width: 80%;
    height: 90%;
    padding: 2rem;
  `}

  ${media.lessThan("medium")`
    width: 100%;
    min-height: 100vh;
    height: 100%;
  `}
`;
