import styled from "styled-components";

export const MinMaxInput = styled.input`
  height: 34px;
  max-height: 34px;
  max-width: 100px;
  border: 1px solid #fff;
  margin-left: 5px;
  outline: none;
  padding-left: 6px;
[type="number"] {
  -moz-appearance: textfield;
}
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
:hover,
:focus {
  border: 1px solid ${({inputBorder}) => (inputBorder ? "#f6c717" : "#331f53")};
  transition: all 0.3s ease-in-out;
::placeholder {
  font-size: 13px;
}
}
`

export const PaginationButtonStyled = styled.li`
  background-color: ${({className, primary}) => {
   if(className) {
    return (primary ? "#f6c717" : "#331f53")
   } else return 'transparent'
  }};
  color: ${({className, primary}) => {
   if(className) {
    return (primary ? "#000" : "#fff")
   } else return '#000'
  }};
  cursor: pointer;
  width: 20px;
  height: 20px;
  text-align: center;
  padding: 2px;
  list-style: none;

  :hover,
  :active{
     background-color: ${({primary}) => (primary ? "#f6c717" : "#331f53")};
     color: ${({ primary }) => (primary ? "#000" : "#fff")};
      transition: all 0.3s ease-in-out;
  }
`