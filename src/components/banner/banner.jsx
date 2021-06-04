import React from 'react';
import {BannerWrapper, Container, Logo, SubTitle} from './style';

const Banner = ({ appName, token }) => {
  return (
    <BannerWrapper>
      <Container>
        <Logo>
          {appName}
        </Logo>
        <SubTitle>Место, где готовится новый опыт</SubTitle>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
