import React from 'react';
import styled from 'styled-components';


const IconButtonComp = ({icon, ...rest}) => {

  return (
    <button {...rest}><img src={icon}/></button>
  )
}

const IconButton = styled(IconButtonComp)`

  box-sizing: border-box;
  border-radius: 6px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props => props.theme.color.secondary};
  border: none;
  box-shadow: 0px 2px 20px 3px rgba(0, 26, 255, 0.3);
  outline: none;
  transition: all 200ms ease;
  :hover {
    box-shadow: 0px 4px 20px 3px rgba(0, 26, 255, 0.4);
    transform: translateY(-2px);
  }
  :active {
    transform: translateY(3px);
    box-shadow: 0px 1px 20px 3px rgba(0, 26, 255, 0.3);

  }

`

export default IconButton;