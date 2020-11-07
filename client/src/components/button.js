import React from 'react';
import styled from 'styled-components';

const ButtonText = styled.span`
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 0.03em;
  color: white;

  margin-left: ${props => props.children.length > 0 ? "1.5rem" : undefined}

`

const ButtonC = ({className, children, text, ...rest}) => {
  return (
    <button className={className} {...rest}>{children} <ButtonText>{text}</ButtonText></button>
  )
}

const Button = styled(ButtonC)`
  background: linear-gradient(230.67deg, #000B73 0%, #0011A8 100%);
  box-shadow: 0px 2px 20px 3px rgba(0, 26, 255, 0.3);
  border-radius: 16px;

  display: flex;
  justify-content: center;

  border: none;
  outline: none;
  padding: 0.625rem 2.25rem;
`

export default Button;