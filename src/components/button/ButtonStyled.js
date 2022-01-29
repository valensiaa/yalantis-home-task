import styled from "styled-components";

export const ButtonStyled = styled.button`
    width: 100%;
    padding: 7px 0;
    border: none;
    border-radius: 0px;
    background-color: ${({primary}) => (primary ? "#f6c717" : "#331f53")};
    color: ${({ primary }) => (primary ? "#000" : "#fff")};
    font-size: 14px;
    font-style: normal;
    height: 35px;
    max-height: 35px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    :hover,
    :disabled {
      background-color: ${({ primary }) => (primary ? "#f3d46d" : "#5c4c75")};
      transition: all 0.3s ease-in-out;
    }

`;


