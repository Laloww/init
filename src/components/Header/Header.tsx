import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import logo from '../../assets/images/logo.png'
import {ConnectWallet} from "../ConnectWallet";

const Header = () => {

    return (
        <HeaderStyled>
            <LogoStyled src={logo} />
            <WalletPosition>
                <ConnectWallet />
            </WalletPosition>
        </HeaderStyled>
    )
}
const WalletPosition = styled.div`
  position: absolute;
  right: 70px;
`
const LogoStyled = styled.img`
  width: 150px;
  height: 25px;
`

const HeaderStyled = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #CDD2DD;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 100%;
  
`

export default Header
