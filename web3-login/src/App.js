import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Error404 from './components/Error404'
import Restricted from './components/Restricted'
import SocialMedia from './components/SocialMedia'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Restricted} />
                    <Route exact path='/facebook' component={SocialMedia} />
                    <Route exact path='/instagram' component={SocialMedia} />
                    <Route exact path='/telegram' component={SocialMedia} />
                    <Route exact path='/twitter' component={SocialMedia} />
                    <Route exact path='/reddit' component={SocialMedia} />
                    <Route exact path='/youtube' component={SocialMedia} />
                    <Route exact path='/twitch' component={SocialMedia} />
                    <Route component={Error404} />
                </Switch>
                <Footer />
            </Router>
        )
    }
}