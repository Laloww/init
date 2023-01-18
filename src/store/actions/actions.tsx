export function setAccount(string: any) {
    console.log('qwe', string)
    return {
        type: "@web3/SETACCOUNT",
        payload: string
    };
}

export function setNetwrokId(number: number) {
    return {
        type: "@web3/SETNETWORKID",
        payload: number
    };
}
