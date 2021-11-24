import React, { Component } from 'react'
import axios from 'axios'
import {  Link } from 'react-router-dom';

export default class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            location: "",
            message: "",
            divStyle : "",
        };
    }
    validateForm = () => {
        let title = this.state.title;
        let desc = this.state.description;
        let loc = this.state.location;
        let isValid = true;
        if (title === ""){
            var element = document.getElementById("title");
            element.classList.add("error-input");
            this.setState({message: "All fields are mandatory"})
            isValid=  false;
        }
         if (desc === "") {
            element = document.getElementById("desc");
            element.classList.add("error-input");
            this.setState({message: "All fields are mandatory"})
            isValid = false;
        } if(loc===""){
            element = document.getElementById("loc");
            element.classList.add("error-input");
            this.setState({message: "All fields are mandatory"})
            isValid = false;
        }
        return isValid;
      }
    handlePostJob = () => {
        let isValid = this.validateForm();
        if(isValid){
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
                this.setState({ message: err.response.data.errors.location });
            })
        }
    }
    render() {
        
        return (
            <div>
                <div className="reactangle-login ">
                    <Link to='/dashboard' className="fa fa-home text-dec home-margin" aria-hidden="true">Home</Link>
                    <label className="text-dec">&gt; Post Job</label>
                    <div className="auth-wrapper ">
                        <div className="auth-inner reset">
                            <div className="container">
                                <h3>Post a Job</h3>
                                <div className="form-group">
                                    <label >Job Title*</label>
                                    <input type="text" id="title" onChange={(e) => {this.setState({ title: e.target.value });  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter job title" required />
                                </div>
                                <div className="form-group">
                                    <label >Description*</label>
                                    <textarea className="form-control" id="desc" onChange={(e) => { this.setState({ description: e.target.value});  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} placeholder="Enter job description" rows="3" required />
                                </div>
                                <div className="form-group">
                                    <label >Location*</label>
                                    <input type="text" id="loc" onChange={(e) => {this.setState({ location: e.target.value });  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter job title" required />
                                </div>
                                <div className="form-group btn-div">
                                <label className="error err-msg">{this.state.message}</label><br />
                                    <button type="submit" className="btn btn-primary first-btn" onClick={this.handlePostJob}>Post</button>
                                </div>
                            </div>
                        </div></div></div>
            </div>
        )
    }
}
