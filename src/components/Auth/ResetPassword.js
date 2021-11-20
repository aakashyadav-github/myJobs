import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "",
        };
    }
    resetHandle() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        let data = { "password": this.state.newPassword, "confirmPassword": this.state.confirmPassword, "token": token };
        axios.post("https://jobs-api.squareboat.info/api/v1/auth/resetpassword", data).then(
            res => {
                if (res.status === 200) {
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="reactangle-login">
                <div className="auth-wrapper ">
                    <div className="auth-inner reset">
                        <div className="container">
                            <h3>Reset Your Password</h3>
                            <label>Enter your password</label>
                            <div className="form-group">
                                <label >New Password</label>
                                <input type="text" onChange={(e) => this.setState({ newPassword: e.target.value })} className="form-control" placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <label >Confirm New Passowrd</label>
                                <input type="text" onChange={(e) => this.setState({ confirmPassword: e.target.value })} className="form-control" placeholder="Enter password" />
                            </div>
                            <div className="btn-div">
                                <label className="error">{this.state.errMessage}</label><br />
                                <button type="submit" className="btn btn-primary first-btn" onClick={() => this.resetHandle()}>Reset</button>
                            </div>
                        </div>
                    </div></div></div>
        )
    }
}
