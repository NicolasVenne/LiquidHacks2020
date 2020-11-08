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
`

export default NavButton;
