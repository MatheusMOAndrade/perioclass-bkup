import styled, { css } from 'styled-components'


export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5vh;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

export const LWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;

`

export const Title = styled.div`
  font-size: 29px;
  font-weight: 500;
  color: white;
  display:flex;
  align-items: center;
  }
`;

export const Back = styled.button`
  z-index: 10;
  color: white;
  font-size: 35px;
  font-weight: 400;
  background: transparent;
  border: none;
  border-radius: 100%;
  transaction: 0.5s;
  cursor: pointer;
  margin-right: 20px;
  & :hover {
    background: rgba(0,0,0,0.2);
  }
`;

export const Add = styled(Back)`
align-items: center;


`;