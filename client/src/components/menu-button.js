import React from 'react';
import styled from 'styled-components';

const ButtonText = styled.span`
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 0.03em;
  color: white;
  position: relative;
  z-index: 10;

  margin-left: ${props => {
    return props.hasChildren ? "1.5rem" : undefined;
  }}

`

const MenuButtonC = ({primary, className, children, text, ...rest}) => {
  return (
    <button className={className} {...rest}>{children} <ButtonText hasChildren={children !== undefined}>{text}</ButtonText></button>
  )
}

const MenuButton = styled(MenuButtonC)`
  background: #09091B;
  border: 2px solid #0C00F6;
  border-left: ${props => props.isSelected ? "15px solid #0C00F6" : "2px solid #0C00F6"};
  border-radius: 16px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  outline: none;


  padding: 0.9rem 2.25rem;

  position: relative;

  img {
    z-index: 10;
  }
  transition: all 250ms ease;

  ::after {
    transition: all 250ms ease;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${props => props.primary ? undefined: "linear-gradient(50deg, #000B73 0%, #0011A8 100%)"};
    border-radius: 1rem;
    opacity: 0;
    

  }

  :hover:after {
    opacity: 1;
  }
  :hover {
    box-shadow: ${props => props.primary ? undefined : "0px 2px 20px 3px rgba(0, 26, 255, 0.4);"};
    background: ${props => props.primary ? "#AE771E" : undefined};
  }
`

export default MenuButton;