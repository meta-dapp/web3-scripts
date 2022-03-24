import React, { Component } from 'react'

export default class Error404 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: undefined,
            author: undefined,
        }
    }

    componentDidMount() {
        fetch('http://quotes.stormconsultancy.co.uk/random.json')
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState({
                    quote: res.quote,
                    author: res.author
                })
            });
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="error-404 d-flex align-items-center justify-content-center">
                        <div className="container">
                            <div className="card py-5">
                                <div className="row g-0">
                                    <div className="col col-xl-5">
                                        <div className="card-body p-4">
                                            <h1 className="display-1"><span className="text-primary">4</span><span className="text-danger">0</span><span className="text-success">4</span></h1>
                                            <h2 className="font-weight-bold display-4">{this.state.author}</h2>
                                            <p>{this.state.quote}</p>
                                            <div className="mt-5"> <a href="/" className="btn btn-primary btn-lg px-md-5 radius-30">Home</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7">
                                        <img src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/03/shutterstock_1338315902.png" className="img-fluid" alt=""></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}