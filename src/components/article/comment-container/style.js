import styled from 'styled-components';

export const Container = styled.div`  
  width: 728px;
  margin: 0 auto;
  padding: 0;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 425px) {
    padding: 0 8px;
  } 
`;

export const Caption = styled.span`
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 32px;
`;
