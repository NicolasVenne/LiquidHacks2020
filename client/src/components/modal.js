import React from 'react';
import styled from 'styled-components';


const ModalOverlay = styled.div`

  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.3);
  justify-content: center;
  align-items: center;
  display: ${props => props.open ? "flex" : "none"};

`

const ModalComp = ({open, close, children, ...rest}) => {

  return (
    <ModalOverlay open={open} onClick={(e) => {
      if(e.target.className.includes(ModalOverlay.styledComponentId)) close()
      
      }}>
      <div {...rest}>
        {children}
      </div>
    </ModalOverlay>
  )
}

const Modal = styled(ModalComp)`
  display: flex;
  flex-direction: column;
  background: #09091B;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #474747;

`

export default Modal;
