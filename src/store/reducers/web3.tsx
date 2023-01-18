const initialState = {
    account: '',
    chainId: ''
};
export default function web3(state = initialState, { type, payload }: any) {
    switch (type) {
        case '@web3/SETACCOUNT':
            return {
                ...state,
                account: payload,
            };
        case '@web3/SETNETWORKID':
            return {
                ...state,
                chainId: payload
            }
        default: {
            return state;
        }
    }
}

