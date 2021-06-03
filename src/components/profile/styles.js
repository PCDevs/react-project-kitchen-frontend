import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

export const UserInfo = styled.div`
  border-bottom: 1px solid rgba(242, 242, 243, 0.4);
  padding: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    min-height: 156px;
    min-width: 120px;
    margin: 32px auto 16px auto;
  }
  & > h4 {
    color: #f2f2f3;
    font-family: Exo 2;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }
`;

export const UserArticles = styled.div`
  max-width: 808px;
`;
