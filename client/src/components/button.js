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

const ButtonC = ({primary, className, children, text, ...rest}) => {
  return (
    <button className={className} {...rest}>{children} <ButtonText hasChildren={children !== undefined}>{text}</ButtonText></button>
  )
}

const Button = styled(ButtonC)`
  background: ${props => props.primary ? props.theme.color.primary : "linear-gradient(50deg, #000B73 0%, #0011A8 100%)"};
  box-shadow: ${props => props.primary ? undefined: "0px 2px 20px 3px rgba(0, 26, 255, 0.3);"};
  border-radius: 16px;
  cursor: pointer;

  display: flex;
  justify-content: center;

  border: none;
  outline: none;
  padding: 0.625rem 2.25rem;

  position: relative;

  img {
    z-index: 10;
  }
  transition: all 250ms ease;

  ::after {
    transition: all 250ms ease;
    content: "";
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

export default Button;