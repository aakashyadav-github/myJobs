import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom';

export default class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            location: "",
            message: "",
        };
    }

    handlePostJob = () => {
        const headers = {
            'Authorization': JSON.parse(localStorage.getItem('tokens'))
        }
        let data = {
            "title": this.state.title,
            "description": this.state.description,
            "location": this.state.location
        };
        axios.post("https://jobs-api.squareboat.info/api/v1/jobs", data, {
            headers: headers
        }).then(
            res => {
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: err.response.data.errors.location });
            })
    }
    render() {
        return (
            <div>
                <div className="reactangle-login ">
                    <Link to='/dashboard' className="fa fa-home text-dec home-margin" aria-hidden="true">Home</Link>
                    <div className="auth-wrapper ">
                        <div className="auth-inner reset">
                            <div className="container">
                                <h3>Post a Job</h3>
                                <div className="form-group">
                                    <label >Job Title*</label>
                                    <input type="text" onChange={(e) => this.setState({ title: e.target.value })} className="form-control" placeholder="Enter job title" required />
                                </div>
                                <div className="form-group">
                                    <label >Description*</label>
                                    <textarea className="form-control" onChange={(e) => this.setState({ description: e.target.value })} placeholder="Enter job description" rows="3" required />
                                </div>
                                <div className="form-group">
                                    <label >Location*</label>
                                    <input type="text" onChange={(e) => this.setState({ location: e.target.value })} className="form-control" placeholder="Enter job title" required />
                                </div>
                                <div className="form-group btn-div">
                                    <label className="error">{this.state.message}</label><br />
                                    <button type="submit" className="btn btn-primary first-btn" onClick={this.handlePostJob}>Post</button>
                                </div>
                            </div>
                        </div></div></div>
            </div>
        )
    }
}
