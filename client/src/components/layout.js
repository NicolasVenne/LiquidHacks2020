import React from 'react';
import styled from 'styled-components';

const LayoutC = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const Layout = styled(LayoutC)`
  height: 100%;
`

export default Layout;