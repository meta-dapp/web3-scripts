import React, { Component } from 'react'
import Restricted from './Restricted'
import { copy, isConnected, resumedAddress } from '../util/Utils'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: undefined
        }
    }

    async componentDidMount() {
        window.addEventListener("storage", (e) => {
            console.log(e)
        })
        if (isConnected()) {
            this.setState({
                account: localStorage.getItem('account')
            })
        }
    }

    render() {
        if (this.state.account)
            return (
                <div className="page-wrapper">
                    <div className="page-content">
                        <div className="nothing-to-show d-flex align-items-center justify-content-center">
                            <div className="card shadow-none bg-transparent">
                                <div className="card-body text-center">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 mx-auto">
                                            <h4 className="mt-3 pointer" onClick={() => copy(this.state.account)}>
                                                Cuenta: {resumedAddress(this.state.account)}
                                                <i className="bx bx-copy me-1"></i>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <Restricted />
            )
    }
}