import React from 'react';
import styled from 'styled-components'

const Text = styled.div`
  font-size: ${props => props.size  || 1}rem;
  font-weight: ${props => props.weight || 400};
  color: ${props => props.color || "white"};

`

export default Text;