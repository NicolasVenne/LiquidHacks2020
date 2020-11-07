import React from 'react';
import styled from 'styled-components'


const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: ${props => props.color || "white"};

`

const Heading = {}
Heading.H1 = H1;

export default Heading;