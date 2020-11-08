import React from 'react';
import styled from 'styled-components'


const Line = styled.div`
  width: 100vw;
  height: 1px; 
  background: ${props => props.color || "white"};
  position: absolute;
  left: ${props => props.left || undefined};
  top: ${props => props.top || undefined};
  right: ${props => props.right || undefined};
  bottom: ${props => props.bottom || undefined};

  z-index: 10;
`
export default Line;