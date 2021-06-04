import styled from "styled-components";

export const HeaderNavbar = styled.nav`
  height: 60px;
  margin: 0 auto;
  display: flex;
  background-color: #1c1c21;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  width: 1108px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 16px 0 0;
`;

export const HeaderLink = styled.li`
  display: flex;
  align-items: center;

  & > img {
    max-width: 24px;
    max-height: 24px;
    margin: 0 8px 0 0;
  }
  & > a {
    text-decoration: none;
    margin: 0 16px 0 0;
    color: #8585ad;
    font-size: 16px;
    line-height: 24px;

    ${({ isActive }) => {
      return isActive && ` color: #F2F2F3;`;
    }}
  }
`;

export const Logo = styled.span`
  & > a {
    font-family: 'Exo 2', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    text-decoration: none;
    background: linear-gradient(90deg, #801AB2, #4C4CFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &:hover {
      text-shadow: 0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5);
    }
  }
`;
