import React from 'react';
import styled from 'styled-components'



const StepCircleComp = ({number, active, className}) => {
  return (
    <div className={className}>
      {number}
    </div>
  )
}

const StepCircle = styled(StepCircleComp)`

  border-radius: 100%;
  border: 4px solid;
  width: 66px;
  height: 66px;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  border-color: ${props => props.active ? "#0C00F6" : "white"};

`

export default StepCircle; 