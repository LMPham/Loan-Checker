import { FormControl, Tooltip } from "react-bootstrap";
import styled from "styled-components";

export const FileUploadForm = styled.div<{ $disabled?: boolean }>`
  height: 13rem;
  max-width: 100%;
  text-align: center;
  position: relative;

  ${({ $disabled }) =>
    $disabled &&
    `
    color: rgba(var(--tblr-secondary-rgb), 1) !important;
  `}
`;

export const Input = styled(FormControl)`
  display: none;
`;

export const FileUploadContentWrapper = styled.div<{
  $hasFile?: boolean;
  $disabled?: boolean;
}>`
  pointer-events: auto;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-weight: 400;

  svg {
    color: ${({ theme, $hasFile }) =>
      $hasFile ? theme.fileInput.primaryColor : theme.fileInput.secondaryColor};
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    svg{
      color: rgba(var(--tblr-secondary-rgb), 1);
    }
  `}

  p {
    margin: 0.5rem 0;
  }
`;

export const FileUploadLabel = styled.label<{
  $active?: boolean;
  $isInvalid?: boolean;
  $disabled?: boolean;
}>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  border-width: 1px;
  border-radius: 25px;
  border-style: dashed;
  border-color: ${({ theme, $isInvalid }) =>
    $isInvalid ? theme.fileInput.red : theme.fileInput.borderColor};
  background-color: ${({ $active }) =>
    $active ? "rgba(17,97,132,0.1)" : ({ theme }) => theme.fileInput.white};
  ${({ $disabled }) =>
    $disabled &&
    `
    background-color: var(--tblr-bg-surface-secondary);
    pointer-events: none;
  `}
`;

export const DragFileElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const FileNameWrapper = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  margin-top: 0.5rem;
  align-items: center;
  max-width: 24rem;
  font-family: ${({ theme }) => theme.fontFamily.body};

  button {
    border: none;
    padding: 2px 8px;

    :hover {
      opacity: 0.7;
    }

    svg {
      color: ${({ theme }) => theme.fileInput.red};
    }
  }
`;

export const FullFileName = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily.body};
`;

export const ShortFileName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileNameTooltip = styled(Tooltip)`
  --tooltip-color: ${({ theme }) => theme.tooltip.background};

  opacity: 1 !important;

  & > .tooltip-inner {
    max-width: 610px;
    text-align: left;

    box-shadow: 1px 1px 3px 3px rgb(0 0 0 / 0.2);
    color: ${({ theme }) => theme.tooltip.text};
    background-color: var(--tooltip-color);
  }

  & > .tooltip-arrow::before {
    border-top-color: var(--tooltip-color);
  }
`;
