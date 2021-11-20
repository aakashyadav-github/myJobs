import React, { Component } from 'react'
import HomeMid from '../HomeMid'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="reactangle">
                    <div className="container sf">
                        <div className="row">
                            <div className="col-md-4 offset-md-1">
                                <h1 className="heading">Welcome to <br /> MyJobs</h1>
                            </div>
                            <div className="col-md-6 offset-md-1">
                                <img src="https://www.urban.org/sites/default/files/styles/feature2_full_hero/public/feature2/jobs-feature-header-1700x700.png?itok=8lB15_K3"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeMid />
            </div>
        )
    }
}
