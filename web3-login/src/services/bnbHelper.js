export default class BNBHelper {
    constructor(web3) {
        this._web3 = web3
    }

    async balance(wallet) {
        return (await this._web3.eth.getBalance(wallet)) / (10 ** 18)
    }

}