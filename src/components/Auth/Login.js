import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from "./context";


const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { setAuthTokens } = useAuth();

    const handleLogin = () => {
        let cred = { "email": email, "password": password };
        axios.post("https://jobs-api.squareboat.info/api/v1/auth/login", cred).then(
            res => {
                setAuthTokens(res.data.data.token);
                setIsLoggedIn(true)
            })
            .catch(err => {
                console.log(err);
                setError('Incorrect Email or Password')
            })
    }

    if (isLoggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="reactangle-login">
            <div className="auth-wrapper ">
                <div className="auth-inner">
                    <div className="container">
                        <h3>Login</h3>

                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <Link className="forgot-label" to={'/forgot'}>Forgot your password?</Link>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="btn-div">
                            <label className="error">{errMessage}</label><br />
                            <button type="submit" className="btn btn-primary first-btn" onClick={handleLogin}>Login</button><br />
                            <Link to={'/register'}>Register</Link>
                        </div>

                    </div>
                </div></div></div>
    )
}
export default Login
