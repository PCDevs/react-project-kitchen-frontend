import styled from 'styled-components';

export const ArticleMetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props => {
    return props.underline && `
      &::after {
        content: '';
        height: 1px;
        box-shadow: inset 0px -1px 0px #373D43;
        position: absolute;
        width: 100vw;
        top: 164px;
        left: 0;    
      }
    `;
  }}
`;

