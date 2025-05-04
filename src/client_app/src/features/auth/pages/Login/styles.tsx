import styled from "styled-components";

export const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.auth.backgroundColor};
`;
export const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
