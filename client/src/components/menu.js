import React from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom'


const MenuHeader = styled.h2`
  font-weight: 600;
  font-size: 1.75rem;

  letter-spacing: 0.05em;
  margin-bottom: 4rem;
  margin-top: 3rem;

  color: #FFFFFF;
`


const MenuLink = styled(Link)`
  margin: 0.5rem 0;
  border: 1px solid #0C00F7;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.05em;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #FFFFFF;
  transition: border 150ms ease;
  border-left: ${props => props.active ? "9px solid #0C00F7;" : undefined};

`


const Menu = {
  Header: MenuHeader,
  Link: MenuLink
}

export default Menu;