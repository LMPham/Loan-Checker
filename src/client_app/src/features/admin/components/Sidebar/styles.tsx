import styled from 'styled-components';

export const SidebarWrapper = styled.aside<{ $isCollapsed: boolean }>`
  && {
    width: 17rem;
    & ~ .page-wrapper {
      margin-left: 17rem;
    }
    ${({ $isCollapsed }) =>
      $isCollapsed &&
      `
    width:60px;
    ~.page-wrapper{
      margin-left: 60px;
    }
    `}
  }
`;
