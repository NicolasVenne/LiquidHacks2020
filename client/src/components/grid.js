import React from 'react';
import styled from 'styled-components';


const Menu = styled.div`
  background: #09091B;
  grid-area: menu;
  border-right: 1px solid #474747;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

const Content = styled.div`
  grid-area: content;
  

`
const Grid = {
  Menu,
  Content
}
export default Grid;