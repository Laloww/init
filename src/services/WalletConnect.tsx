import React, { useMemo, useState } from 'react'
import web3Helper from "../helper/web3"
import {useDispatch} from "react-redux";
import {setAccount, setNetwrokId} from "../store/actions/actions";

export const connectMetamask = async (dispatch: any) => {
    const provider = await web3Helper.getMetamaskProvider();

    web3Helper.setProvider(provider);
    async function getUserInfo() {
        const account = await web3Helper.getCurrentAccount()
        dispatch(setAccount(account))
    }
    try {
        provider.on('accountsChanged', (accounts: any) => {
            getUserInfo()
        });
        provider.on('chainChanged', (newChainId: any) => {
            console.log('chainChanged')
            const chainId = parseInt(newChainId, 16);
            dispatch(setNetwrokId(chainId))
            getUserInfo()
        });
        provider.request({ method: 'eth_chainId' }).then((res: any) => {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then(() => {
                    const chainId = parseInt(res, 16);
                    dispatch(setNetwrokId(chainId))
                    if (chainId != 5) {
                        console.log("!!!!!")
                        web3Helper.changeNetwork("0x5")
                    }
                    getUserInfo()
                    console.log('!', chainId)
                })
                .catch(() => {
                    console.log('!!ERRR')
                });
        });
    } catch (e) {
        console.log('!!ERRR')
    }
};

export const disconnectMetamask = async (dispatch: any) => {
    web3Helper.clearCache()
    dispatch(setAccount(""))
    setNetwrokId(-1)
};
