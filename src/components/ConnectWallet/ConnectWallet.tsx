import React, { useMemo, useState } from 'react'
import {Button} from "../Button";
import {connectMetamask, disconnectMetamask} from "../../services/WalletConnect";
import {useDispatch, useSelector} from "react-redux";
import metamask from "../../assets/images/metamask.png"
import disconnect from "../../assets/images/disconnect.png"
import styled from "styled-components";

const ConnectWallet = () => {
    const dispatch = useDispatch();
    const account = useSelector((state: any) => state.web3.account)
    const chainId = useSelector((state: any) => state.web3.chainId)
    const disconnectWallet = () => {
        disconnectMetamask(dispatch)
    }
    const onClick = () => {
        connectMetamask(dispatch)
    }
    const convertAddress = (account: string) => {
        return account.substr(0,9) + '...' + account.substr(account.length - 4, account.length)
    }
    return (
        <div>
            {account && account.length > 0 && chainId == 5 ? (
                <UserAccout>
                    <img src={metamask} width={24} height={24}/>
                    {convertAddress(account)}
                    <img onClick={disconnectWallet} src={disconnect} width={16} height={16}/>
                </UserAccout>
            ) : account && account.length > 0 && chainId != 5 ? (
                <Button text="Change network" handleClick={onClick} />
            ) : (
                <Button text="Connect Wallet" handleClick={onClick} />
            )}
        </div>
    )
}
const UserAccout = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope';
  border: none;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 15px 14px;
  color: #08D899;
  font-size: 14px;
  font-weight: 700;
`
export default ConnectWallet
