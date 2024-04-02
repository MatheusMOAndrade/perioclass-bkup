import styled from "styled-components";
import { css } from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.button`
  font-family: "Maven Pro";
  font-weight: 500;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  background-color: ${theme.colors.primaryGreen};
  transition: 0.3s;
  box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 11%);
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.secondaryGreen};
  }

  // modifiers

  ${({ disabled, secondary, floatRight }: any) => css`
    ${disabled &&
    css`
      background-color: #b9bdbc;

      &:hover {
        background-color: #b9bdbc;
      }
    `}
    ${secondary &&
    css`
      background: none;
      color: #019267;
      border: 1px solid #019267;

      &:hover {
        background-color: #fafafa;
      }
    `}
    ${floatRight &&
    css`
      position: relative;
      float: right;
    `}
  `}
`;
