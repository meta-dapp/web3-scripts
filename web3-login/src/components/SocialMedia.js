import React, { Component } from 'react'
import Restricted from './Restricted'
import { isConnected } from '../util/Utils'

export default class SocialMedia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            social: this.props.location.pathname.split('/')[1].toLowerCase(),
            account: undefined
        }
    }

    async load() {
        if (isConnected()) {
            this.setState({
                account: localStorage.getItem('account')
            }, () => {

            })

            if (this.unregisterHistoryListener)
                this.unregisterHistoryListener()
            this.unregisterHistoryListener = this.props.history.listen(location => {
                this.setState({
                    social: location.pathname.split('/')[1].toLowerCase(),
                    account: undefined
                }, async () => {
                    this.load()
                })
            })
        }
    }

    async componentDidMount() {
        this.load()
    }
    async componentWillUnmount() {
        if (this.unregisterHistoryListener)
            this.unregisterHistoryListener()
    }

    render() {
        if (isConnected() && this.state.account)
            return (
                <div className="page-wrapper">
                    <div className="page-content">
                        <div className="nothing-to-show d-flex align-items-center justify-content-center">
                            <div className="card shadow-none bg-transparent">
                                <div className="card-body text-center">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 mx-auto">
                                            <a target="_blank" href="https://youtube.com/channel/UCdRihNiJ0tJ7xpFGKcwZcdQ"><h4 className={`mb-0 text-stats-${this.state.social}`}><i className={`bx bxl-${this.state.social}`}></i> {this.state.social.toUpperCase()} <i className="bx bx-link-external"></i></h4></a>
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