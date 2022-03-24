import React, { Component } from 'react'
import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { pMinify, resumedAddress, _error, isConnected } from '../util/Utils'
import { Toaster } from 'react-hot-toast'
import commaNumber from 'comma-number'
import { Link } from 'react-router-dom'
import BNBHelper from '../services/bnbHelper'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: undefined,
            bnb_balance: undefined
        }
    }

    resetState() {
        this.setState({
            account: undefined,
            bnb_balance: undefined
        })
    }

    async connect() {
        try {
            this.provider = await this.web3Modal.connect()
        } catch (er) {
            _error('Conéctate a Binance Smart Chain')
            this.disconnect()
            return
        }

        this._web3 = new Web3(this.provider)
        this._bnb = new BNBHelper(this._web3)
        this.setState({
            account: (await this.getAccount())
        }, () => {
            if (this.state.account)
                this.load()
        })

        this.provider.on("accountsChanged", (accounts) => {
            this.fetchAccounts(accounts)
        })

        this.provider.on("networkChanged", (networkId) => {
            if (networkId === '56') {
                this.disconnect()
                this.connect()
            } else {
                _error('Conéctate a Binance Smart Chain')
                this.disconnect()
            }
        })

        this.provider.on("disconnect", (error) => {
            this.dropState()
            this.resetState()
        })
    }

    async _fetchAccounts() {
        this.dropState()
        this.resetState()
        const account = await this.getAccount()
        if (account) {
            this.setState({
                account
            }, () => this.load())
        }
    }

    async fetchAccounts(accounts) {
        this.dropState()
        this.resetState()
        if (accounts.length > 0) {
            const account = accounts[0].toLowerCase()
            this.setState({
                account
            }, () => this.load())
        }
    }

    async disconnect() {
        try {
            this.dropState()
            this.resetState()
        } catch (errr) {
            if (this.provider.close) {
                await this.provider.close()
                await this.web3Modal.clearCachedProvider()
                this.provider = null
            }
        }

        this.props.history.push('/login')
    }

    dropState() {
        localStorage.clear()
    }

    async componentWillUnmount() {
        this.resetState()
    }

    async initWeb3() {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        56: "https://bsc-dataseed.binance.org"
                    },
                    network: 'binance'
                }
            }
        }
        this.web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        })
        if (isConnected()) {
            this.connect()
        } else this.props.history.push('/login')
    }

    async componentDidMount() {
        this.initWeb3()
    }

    async load() {
        this.setState({
            bnb_balance: (await this._bnb.balance(this.state.account))
        }, () => {
            localStorage.setItem('eth_connected', 'y')
            localStorage.setItem('account', this.state.account)
            this.props.history.push('/')
        })
    }

    commasFormat(x) {
        return commaNumber(x)
    }

    async getAccount() {
        const account = (await this._web3.eth.getAccounts())[0]
        return account ? account.toLowerCase() : undefined
    }

    UserSpace() {
        if (this.state.account)
            return (
                <>
                    <a className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src='/favicon.png' className="user-img" alt="user avatar"></img>
                        <div className="user-info ps-3">
                            <p className="user-name mb-0">{resumedAddress(this.state.account)}</p>
                            <p className="designattion mb-0"><strong>{`${pMinify(this.state.bnb_balance, 4)}`} BNB</strong></p>
                        </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" onClick={() => this.disconnect()}><i
                            className='bx bx-log-out-circle'></i><span>Desconectarse</span></a>
                        </li>
                    </ul>
                </>
            )
        else {
            return (
                <button onClick={() => this.connect()} type="button" className="btn btn-outline-dark  px-3 radius-30">Conectarse</button>
            )
        }
    }

    render() {
        return (
            <>
                <Toaster />
                <div className="sidebar-wrapper" data-simplebar="true">
                    <div className="sidebar-header">
                        <div>
                            <img src="favicon.png" className="logo-icon" alt="logo icon"></img>
                        </div>
                        <div>
                            <p className="logo-text">eta <span className="badge bg-primary bg-iuser-youtube">Dapp</span></p>
                        </div>
                        <div className="toggle-icon ms-auto"><i className='bx bx-arrow-to-left'></i>
                        </div>
                    </div>
                    <ul className="metismenu" id="menu">
                        <li>
                            <Link className="text-stats-home" to="/">
                                <div className="parent-icon"><i className='bx bx-home-circle'></i>
                                </div>
                                <div className="menu-title">Home</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-facebook" to="/facebook">
                                <div className="parent-icon"><i className="bx bxl-facebook"></i>
                                </div>
                                <div className="menu-title">Facebook</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-instagram" to="/instagram">
                                <div className="parent-icon"><i className="bx bxl-instagram"></i>
                                </div>
                                <div className="menu-title">Instagram</div>
                            </Link>
                        </li>
                        <li className="menu-label"><strong>Otras redes sociales</strong></li>
                        <li>
                            <Link className="text-stats-youtube" to="/youtube">
                                <div className="parent-icon"><i className="bx bxl-youtube"></i>
                                </div>
                                <div className="menu-title">Youtube</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-twitch" to="/twitch">
                                <div className="parent-icon"><i className="bx bxl-twitch"></i>
                                </div>
                                <div className="menu-title">Twitch</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-telegram" to="/telegram">
                                <div className="parent-icon"><i className="bx bxl-telegram"></i>
                                </div>
                                <div className="menu-title">Telegram</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-twitter" to="/twitter">
                                <div className="parent-icon"><i className="bx bxl-twitter"></i>
                                </div>
                                <div className="menu-title">Twitter</div>
                            </Link>
                        </li>
                        <li>
                            <Link className="text-stats-reddit" to="/reddit">
                                <div className="parent-icon"><i className="bx bxl-reddit"></i>
                                </div>
                                <div className="menu-title">Reddit</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <header>
                    <div className="topbar d-flex align-items-center">
                        <nav className="navbar navbar-expand">
                            <div className="mobile-toggle-menu"><i className='bx bx-menu'></i>
                            </div>
                            <div className="header-notifications-list">
                            </div>
                            <div className="header-message-list">
                            </div>
                            <div className="search-bar flex-grow-1">

                            </div>
                            <div className="top-menu ms-auto">
                                <ul className="navbar-nav align-items-center">
                                    <li className="nav-item pointer">
                                        <i id="change-theme" className="bx bx-moon theme-font"></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="user-box dropdown">
                                {
                                    this.UserSpace()
                                }
                            </div>
                        </nav>
                    </div>
                </header>

            </>
        )
    }
}

export default withRouter(Header)