import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
// import { BigNumber } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
// import {
//   GOERLI_NETWORK_ID,
// } from '../constants';

interface IWeb3 {
  __account: any;
  provider: any;
  __web3?: Web3;
  setProvider: (provider: any) => void;
  __initWeb3: () => Web3;
  web3: () => Web3;
  getMetamaskProvider(): any;
  changeNetwork: (network: any) => Promise<void>;
  clearCache: () => void;
  getCurrentAccount: () => Promise<string | null>;


}

const web3Helper: IWeb3 = {
  __account: undefined,
  provider: null,
  __web3: undefined,

  setProvider(provider: any) {
    if (this.provider && typeof this.provider.removeAllListeners === 'function') {
      this.provider.removeAllListeners();
    }
    this.provider = provider;
    this.__initWeb3();
  },

  __initWeb3(): Web3 {
    if (this.provider !== null) {
      this.__web3 = new Web3(this.provider);
      return this.__web3;
    }
    this.setProvider(new Web3.providers.HttpProvider('https://rpc.ankr.com/fantom'));
    return this.__web3 as Web3;
  },

  web3(): Web3 {
    if (!this.__web3) {
      this.__initWeb3();
    }
    return this.__web3 as Web3;
  },

  async getCurrentAccount() {
    if (this.__account) {
      return this.__account;
    }
    const accounts = await this.web3().eth.getAccounts();
    return accounts.length ? accounts[0] : null;
  },

  clearCache() {
    this.__account = undefined
    this.provider = null
    this.__web3 = undefined
  },

  async changeNetwork(network: any) {
    const provider = this.provider
    if (!provider) {
      return;
    }
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network }],
      });
    } catch (switchError: any) {
      console.log('Error wallet_switchEthereumChain', switchError)
      // handle other "switch" errors
    }
  },

  async getMetamaskProvider(): Promise<any> {
    let provider: any = await detectEthereumProvider({ mustBeMetaMask: true }).catch(() => undefined);
    if (provider?.providers) {
      provider = provider.providers.find((providerItem: any) => providerItem.isMetaMask);
    }

    if (provider?.isBraveWallet) {
      return undefined;
    }

    return provider;
  },

};

export default web3Helper;
