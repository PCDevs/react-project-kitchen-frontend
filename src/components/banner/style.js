import styled from 'styled-components';

export const BannerWrapper = styled.div`

`;

export const Container = styled.div`
  max-width: 1108px;
  margin: 0 auto;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 425px) {
    padding: 0 8px;
  } 
`;

export const Logo = styled.h1`
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 64px;
  text-decoration: none;
  background: linear-gradient(90deg, #801AB2, #4C4CFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: default;
  &:hover {
    text-shadow: 0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5);
  }
`;

export const SubTitle = styled.p`
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  line-height: 28px;
  color: #fff;
  cursor: default;
`;
