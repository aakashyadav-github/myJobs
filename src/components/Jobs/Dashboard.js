import React, { Component } from 'react'
import JobCard from './JobCard'
import axios from 'axios'

export default class Dashbaord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
        }
    }
    componentDidMount() {
        axios.get("https://jobs-api.squareboat.info/api/v1/jobs").then(
            res => {
                this.setState({ jobs: [...res.data.data] })
            })
    }

    render() {
        return (
            <div className="reactangle-dashboard">
                <div className="container">
                    <i className="fa fa-home " aria-hidden="true"></i><label className="text-dec">Home</label>
                    <h3 className="job-header">Jobs posted by you</h3>
                    <div className="row">{
                        this.state.jobs.length > 0 ?
                            this.state.jobs.map((job) => {
                                return (<JobCard jobData={job} />)
                            }) : (<h2>Your posted jobs will show here</h2>)
                    }

                    </div>
                </div>
            </div>
        )
    }
}
