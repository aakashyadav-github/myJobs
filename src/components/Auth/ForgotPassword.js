import React, { Component } from 'react'
import axios from 'axios'

// Component to use the Forgot Password fucntionality
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errMessage: "",
            isSuccess: false,
        };
    }
    forgotPasswordHandle() {
        axios.get("https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=" + this.state.email).then(
            res => {
                if (res.status === 201) {
                    // checking the VerifyPasswordToken API
                    axios.get("https://jobs-api.squareboat.info/api/v1/auth/resetpassword/" + res.data.data.token).then(
                        resp => {
                            this.setState({ isSuccess: true })
                            this.props.history.push(`/reset?token=${res.data.data.token}`);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(err => {
                this.setState({ errMessage: "Please enter a valid Email" })
            })
    }
    render() {
        return (
            <div className="reactangle-login">
                <div className="auth-wrapper ">
                    <div className="auth-inner forgot">
                        <div className="container">
                            <h3>Forgot your password?</h3>
                            <label>Enter the email associated with your account and we'll send you instructions to reset your password</label>
                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" onChange={(e) => this.setState({ email: e.target.value })} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className=" btn-div">
                                <label className="error">{this.state.errMessage}</label><br />
                                <button type="submit" className="btn btn-submit btn-primary" onClick={() => this.forgotPasswordHandle()}>Submit</button>
                            </div>
                        </div>
                    </div></div></div>
        )
    }
}
