import React, {useState, useRef} from 'react';
import styled from 'styled-components'

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;

`
const TextInputLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: white;
  margin: 1rem 1rem 1rem 0.5rem;
`

const InputContainer = styled.div`
  border: 2px solid white;
  border-radius: 1rem;
  margin-right: auto;
  padding: 14px 24px;
  background: transparent;
  outline: 0;
  transition: border-color 250ms ease;
  color: white;
  position: relative;
  display: flex;
  cursor: pointer;

  border-color: ${props => props.copied ? "#3CDE21" : undefined};
  border-color: ${props => props.error ? "#AC0000" : undefined};

  :focus {
    border-color: ${props => props.theme.color.primary};
  }
`


const TextInputComp = ({fwdRef, label, labelStyle, ...rest}) => {
  return (
    <TextInputContainer>
      {label && <TextInputLabel style={labelStyle}>{label}</TextInputLabel>}
      <input ref={fwdRef} {...rest} />
    </TextInputContainer>
  )
}

const CopyButton = styled.div`
  background: white;
  color: black;
  border-radius: 0.5rem;
  padding: 0.2rem 1rem;
  font-size: 12px;
  letter-spacing: 0.15em;
`



const TextCopyComp = ({label, error, ...rest}) => {

  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  const handleCopy = () => {
    if(!copied) {
      console.log(inputRef.current)
      inputRef.current.select()
      document.execCommand("copy");
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <TextInputContainer>
      {label && <TextInputLabel style={{fontSize: "14px", fontWeight: "400", margin: "1rem 1rem 0.5rem 0.5rem"}}>{label}</TextInputLabel>}
      <InputContainer error={error} onClick={handleCopy} copied={copied}>
        <input ref={inputRef} {...rest} disabled />
        <CopyButton>{copied ? "COPIED" : "COPY"}</CopyButton>
      </InputContainer>
    </TextInputContainer>
  )
}

const TextInput = styled(TextInputComp)` 
  border: 2px solid white;
  border-radius: 1rem;
  font-size: 18px;
  letter-spacing: 0.05em;
  padding: 14px 24px;
  background: transparent;
  outline: 0;
  transition: border-color 250ms ease;
  border-color: ${props => props.error ? "#AC0000" : undefined};
  color: white;
  :focus {
    border-color: ${props => props.theme.color.primary};
  }

  :placeholder {
    color: rgba(1,1,1,0.8);
  }
`

const CopyInput = styled(TextCopyComp)` 
  
  font-size: 18px;
  letter-spacing: 0.05em;
  padding: 0;
  background: transparent;
  border: none;
  width: 100px;
  color: white;
  transition: border 250ms ease;
  :placeholder {
    color: rgba(1,1,1,0.8);
  }

  
`



const Input = {
  Text: TextInput,
  Copy: CopyInput
}

export default Input;