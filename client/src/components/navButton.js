import React from 'react';
import styled from 'styled-components';

const NavButtonC = ({className, children, ...rest}) => {
    return (
      <button className={className} {...rest}>{children} </button>
    )
  }

  const NavButton = styled(NavButtonC)`
    background: ${props => props.isSelected ? "#DA952699" : "linear-gradient(66.92deg, #060612 23.02%, #07051E 95.48%)"};
    border: 1px solid #DA9526;
    box-sizing: border-box;
    border-radius: 6px;
    height: 45px;
    width: 45px;
    cursor: pointer;
    outline: none;


    transition: all 250ms ease;

    ::after {
      transition: all 250ms ease;
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: ${props => props.primary ? undefined: "DA952699"};
      border-radius: 1rem;
      opacity: 0;
      

    }

    :hover:after {
      opacity: 1;
    }
    :hover {
      box-shadow: ${props => props.primary ? undefined : "0px 2px 20px 3px rgba(DA952699, 0.4);"};
      background: ${props => props.primary ? "#DA952699" : undefined};
    }
`

export default NavButton;
