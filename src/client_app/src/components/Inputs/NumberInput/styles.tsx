import styled from "styled-components";
import { FormControl } from "react-bootstrap";

type Props = {
  $isPaddedRight: boolean;
};
export const Input = styled(FormControl)<Props>`
  ${({ $isPaddedRight }) =>
    $isPaddedRight &&
    `
    padding-right: 2rem !important;
  `}
`;
