import millify from "millify"
import toast from 'react-hot-toast'

export function pMinify(number, precision) {
    if (number)
        return millify(number, {
            precision: precision
        })
    else return '0.00'
}

export function dMinify(number) {
    if (number)
        return millify(number)
    else return '0.00'
}

export function resumedAddress(address) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function copy(text) {
    navigator.clipboard.writeText(text)
    toast.success('Copiado!')
}

export function _success(text) {
    toast.success(text)
}

export function _error(text) {
    toast.error(text)
}

export function _loading(text) {
    toast.loading(text, {
        duration: 5000
    })
}

export function isConnected() {
    return localStorage.getItem('eth_connected') === 'y'
}