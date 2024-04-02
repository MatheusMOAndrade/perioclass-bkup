import styled from "styled-components";
import theme from "../../styles/theme";
export const LWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
`;

export const Wrapper = styled.div`
  width: 95vw;
  margin-left: -5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  > div:not(:first-child) {
    width: 90%;
    margin-left: 5vw;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  padding: 8px 16px;
  color: ${theme.colors.white};

  min-width: 10%;
  max-width: 80%;
`;

export const Content = styled.div`
  color: ${theme.colors.white};
  font-size: 18px;
  font-weight: 300;
  padding: 6px 8px 12px 16px;
  > button {
    margin-top: 1rem;
  }
`;

export const Edit = styled.button`
  z-index: 10;
  color: white;
  font-size: 25px;
  font-weight: 400;
  background: transparent;
  border: none;
  border-radius: 100%;
  transaction: 0.5s;
  cursor: pointer;
  margin-right: 20px;
  & :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const Delete = styled(Edit)``;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 39vw;
  padding: 10px;
  border-radius: 5px;
  background-color: ${theme.colors.secondaryBlue};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardIcon = styled.img`
  margin-top: 2vh;
  width: 80;
`;

export const DashboardCardTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  padding: 8px 16px;
  color: ${theme.colors.white};

  min-width: 10%;
  max-width: 70%;
`;
