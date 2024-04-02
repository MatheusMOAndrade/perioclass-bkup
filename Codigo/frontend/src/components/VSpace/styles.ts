import styled from "styled-components";

interface VSpaceProps {
  height: number;
}

export const VSpace = styled.div<VSpaceProps>`
  height: ${(props) => props.height}px;
`;