import Web3 from 'web3';
import { BigNumber } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import {
GOERLI_NETWORK_ID,
} from '../constants';

interface IWeb3 {
provider: any;
__web3?: Web3;
setProvider: (provider: any) => void;
setHttpProvider: (host: string) => void;
setPKProvider: (networkId: number) => void;
web3: () => Web3;
getCurrentAccount: () => Promise<string | null>;
getNetworkId: () => Promise<number>;
__httpWeb3: (networkId?: number) => Promise<Web3>;
__initWeb3: () => Web3;
initHttpWeb3: (networkId: number) => Promise<void>;
useWithHttpWeb3: (networkId: number, callback: any, account?: string) => Promise<any>;
getGasLimit: (callee: any, params: any) => Promise<number>;
sendTransaction: (method: any, params?: any) => Promise<any>;
__transactor: any;
__defaultTransactor: (method: any, params?: any) => Promise<any>;
setTransactor: (transactor: any) => void;
useWithTransactor: (transactor: any, callback: any) => Promise<any>;
__account: any;
clearNetworkCache: () => void;
getMetamaskProvider(): any;
}

const web3Helper: IWeb3 = {
__account: undefined,
__transactor: undefined,
provider: null,
__web3: undefined,

setProvider(provider: any) {
if (this.provider && typeof this.provider.removeAllListeners === 'function') {
this.provider.removeAllListeners();
}
this.provider = provider;
this.__initWeb3();
},

setHttpProvider(host: string) {
this.setProvider(new Web3.providers.HttpProvider(host));
},

__initWeb3(): Web3 {
if (this.provider !== null) {
this.__web3 = new Web3(this.provider);
return this.__web3;
}
this.setProvider(new Web3.providers.HttpProvider(CONSTANTS.FTM_ETH_JSONRPC_URL || ''));
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

async getNetworkId() {
return this.__cache.getOrSetAsync('chainId', this.web3().eth.getChainId);
},

clearNetworkCache(): void {
this.__cache.clearKey('chainId');
},


async initHttpWeb3(networkId: number) {
const web3 = await this.__httpWeb3(networkId);
this.setProvider(web3.currentProvider);
},

async __httpWeb3(networkId?: number): Promise<Web3> {
networkId = networkId || (await this.getNetworkId()) || FTM_NETWORK_ID;
const ethJsonRpcUrl = {
[FTM_NETWORK_ID]: FTM_ETH_JSONRPC_URL,
[FTMTEST_NETWORK_ID]: FTMTEST_ETH_JSONRPC_URL,
[BINANCE_NETWORK_ID]: BSC_ETH_JSONRPC_URL,
[ETHEREUM_NETWORK_ID]: ETH_ETH_JSONRPC_URL,
}[networkId];

    const provider = new Web3.providers.HttpProvider(ethJsonRpcUrl || '');

    return new Web3(provider);
},

async changeNetwork(network: INetwork) {
const provider = this.provider
if (!provider) {
return;
}
try {
await provider.request({
method: 'wallet_switchEthereumChain',
params: [{ chainId: network.chainId }],
});
} catch (switchError: any) {
if (
switchError.code === 4902 ||
switchError.message?.includes('wallet_addEthereumChain')
) {
await provider
.request({
method: 'wallet_addEthereumChain',
params: [
{
chainId: network.chainId,
rpcUrls: [network.rpcUrl],
chainName: network.name,
nativeCurrency: network.nativeCurrency,
},
],
})
.catch((err: any) => {
throw err;
});
} else {
throw switchError;
}
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
