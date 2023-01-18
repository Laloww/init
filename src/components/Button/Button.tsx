import React, { useMemo, useState } from 'react'
import styled from 'styled-components';

export type ButtonProps = {
    text: string
    handleClick: any
}

const Button : React.FC<ButtonProps> = ({text, handleClick}) => {

    return (
        <ButtonStyled onClick={handleClick}>
            {text}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
  font-family: 'Manrope';
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  background: #08D899;
  box-shadow: 0px 8px 16px rgba(8, 216, 153, 0.2);
  width: 200px;
  height: 48px;
  border-radius: 8px;
  color: #FFFFFF;
  border: none;
  &:hover {
    cursor: pointer;
  }
`


export default Button
