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

    const validateForm = () => {
        let isValid = true;
        if (email === ""){
            let element = document.getElementById("email");
            element.classList.add("error-input");
            setError('Incorrect email address or password')
            isValid=  false;
        }
         if (password === "") {
            let element = document.getElementById("password");
            element.classList.add("error-input");
            setError('Incorrect email address or password')
            isValid = false;
        }
        return isValid;
      }
    const handleLogin = () => {
        let isValid = validateForm();
        if(isValid){
        let cred = { "email": email, "password": password };
        axios.post("https://jobs-api.squareboat.info/api/v1/auth/login", cred).then(
            res => {
                setAuthTokens(res.data.data.token);
                setIsLoggedIn(true)
            })
            .catch(err => {
                setError('Incorrect email address or password')
            })
        }
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
                            <label className="labels">Email address</label>
                            <input type="email" id="email" onChange={(e) => {setEmail(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <div className="hash">
                            <label className="labels" >Password</label>
                            <Link className="text-deco labels" to={'/forgot'}>Forgot your password?</Link>
                            </div>
                            <input type="password" id ="password" onChange={(e) => {setPassword(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Password" />
                        </div>
                        <label className="error err-msg">{errMessage}</label><br />
                        <div className="btn-div">
                            <button type="submit" className="btn btn-submit" onClick={handleLogin}>Login</button>
                            <label className="link-page">New to MyJobs? <Link to={'/register'} className="text-deco">Create an account</Link></label>
                        </div>

                    </div>
                </div></div></div>
    )
}
export default Login
