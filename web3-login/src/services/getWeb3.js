import Web3 from 'web3'

const web3 = () => {
  return new Promise((resolve, reject) => {
    let _web3

    if (window.ethereum) {
      _web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        resolve(_web3)
      }).catch((error) => {
        reject()
      })
    } else if (window.web3) {
      _web3 = new Web3(window.web3.currentProvider)
      resolve(_web3)
    } else {
      console.error('Please install Metamask')
      reject()
    }
  })
}

export default web3