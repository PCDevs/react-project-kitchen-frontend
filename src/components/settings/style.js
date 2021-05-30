import styled from 'styled-components';

export const SettingsPage = styled.div`
  background-color: #131316;
  min-height: calc(100vh - 56px);
`;

export const Container = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 425px) {
    padding: 0 8px;
  } 
`;

export const Caption = styled.h2`
  text-align: center;
  padding-bottom: 24px;
`;

export const LinkWrapper = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  width: fill-available;
`;
