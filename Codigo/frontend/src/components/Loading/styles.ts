import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.div`
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-bottom: 180px ;
  &:after {
    content: " ";
    display: block;
    width: 80px;
    height: 80px;
    margin: 8px;
    border-radius: 50%;
    border: 5px solid white;
    border-color: white transparent white transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
