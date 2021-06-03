import styled from 'styled-components';

export const TagWrapper = styled.span`
  max-width: fit-content;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.active ? '#4C4CFF' : '#2F2F37'};
  border-radius: 100px;
  font-size: 12px;
  line-height: 16px;
  margin-right: 10px;
  ${props => {
    if (props.clickable) {
      return `
        cursor: pointer;
        &:hover {
          box-shadow: 0px 0px 16px 8px rgba(51, 51, 255, 0.25), 0px 0px 8px 8px rgba(51, 51, 255, 0.25);
          filter: drop-shadow(0px 4px 32px rgba(51, 51, 255, 0.5));
          background-color: #4C4CFF;
        }
        &:active {
          opacity: 0.9;	
        }
        &:focus {
          outline:0;
        }
      `;
    }
  }}  
  &>svg {
    width: 8px;
    margin-left: 5px;
  }
`;
