import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from "./context";

const Register = (props) => {
    const { setAuthTokens } = useAuth();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [skills, setSkills] = useState('')
    const [userRole, setUserRole] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errMessage, setError] = useState('')

    const registerHandle = () => {
        if (password === confirmPassword) {
            let data = {
                "email": email, "password": password, "name": name,
                "confirmPassword": confirmPassword, "userRole": userRole, "skills": skills
            };
            axios.post(" https://jobs-api.squareboat.info/api/v1/auth/register", data).then(
                res => {
                    if (res.status === 201) {
                        setAuthTokens(res.data.data.token);
                        setIsLoggedIn(true)
                    }
                }
            )
                .catch(err => {
                    setError('Please enter valid details');
                })
        }
        else {
            setError("Passoword don't match");
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
                        <h3>Signup</h3>
                        <label>I'm a</label>
                        <form className="needs-validation" >
                            <div className="form-group">
                                <a className="btn btn-primary"><i class="fa fa-user"></i> Recuiter</a>
                                {/* //ball-pile fa fa not availble so used user itself */}
                                <a className="btn candidate"><i class="fa fa-user"></i>Candidate</a>
                            </div>
                            <div className="form-group">
                                <label >Full Name</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter your full name" required />
                            </div>
                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your email" required />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password" required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Enter your password" required />
                            </div>
                            <div className="form-group">
                                <label >Skills</label>
                                <input type="text" onChange={(e) => setSkills(e.target.value)} className="form-control" placeholder="Enter your skills" required />
                            </div>
                            <div className=" btn-div">
                                <label className="error">{errMessage}</label><br />
                                <button type="submit" className="btn btn-primary first-btn" onClick={registerHandle}>Register</button>
                                <Link to={'/login'}>Login</Link>
                            </div>
                        </form>


                    </div></div></div>
        </div>
    )
}

export default Register
