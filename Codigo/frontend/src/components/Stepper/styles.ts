import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10px;
  border-radius: 20px; 
  background-color: #f0f0f0;
  overflow: hidden; 
`;

export const Step = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${({ active }) => (active ? theme.colors.primaryGreen : '#ccc')};
  transition: transform 0.5s ease-in-out;
  transform: ${({ active }) => (active ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: left;
  
`;
