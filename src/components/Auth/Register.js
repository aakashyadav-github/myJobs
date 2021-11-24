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
    const [errName, setNameError] = useState('')
    const [errPass, setPassError] = useState('')

    const validateForm = () => {
        let isValid = true;
        if (email === ""){
            let element = document.getElementById("email");
            element.classList.add("error-input");
            setError('All fields mandatory');
            isValid=  false;
        }
         if (name === "") {
            let element = document.getElementById("name");
            element.classList.add("error-input");
            setError('All fields mandatory')
            isValid = false;
        }
        if (password === "" || confirmPassword ==="") {
            let element = document.getElementById("password");
            let elementConfirm = document.getElementById("confirmPassword");
            element.classList.add("error-input");
            elementConfirm.classList.add("error-input")
            setError('All fields mandatory')
            isValid = false;
        }
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)){
            let element = document.getElementById("email");
            element.classList.add("error-input");
            setError('Invalid email address');
            isValid=  false;
        }
        
        return isValid;
      }
    const registerHandle = () => {
        let isValid = validateForm();
        if(isValid){
        if (password === confirmPassword) {
            let data = {
                "email": email, "password": password, "name": name,
                "confirmPassword": confirmPassword, "userRole": userRole, "skills": skills
            };
            axios.post(" https://jobs-api.squareboat.info/api/v1/auth/register", data).then(
                res => {
                    console.log(res);
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
                        <label>I'm a*</label>
                            <div className="" role="group" >
                                <input type="radio" value={userRole} onChange={(e) => setUserRole(0)} className="btn-check" name="btnradio" id="btnradio1" checked={userRole===0}/>
                                <label className="btn btn-outline-primary" for="btnradio1"><i className="fa fa-user" />Recruiter</label>
                                <input type="radio" value={userRole} onChange={(e) => setUserRole(1)} className="btn-check" name="btnradio" id="btnradio2" />
                                <label className="btn btn-outline-primary candidate" for="btnradio2"><i className="fa fa-user" />Candidate</label>
                            </div>
                            <div className="form-group">
                                <label className="labels">Full Name*</label>
                                <input type="text" id="name" onChange={(e) => {setName(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter your full name" required />
                            </div>
                            <div className="form-group ">
                                <label className="labels" >Email address*</label>
                                <input type="email" id="email" onChange={(e) => {setEmail(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter your email" required />
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="labels" >Password*</label>
                                    <input type="password" id="password" onChange={(e) => {setPassword(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter your password" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="labels">Confirm Password*</label>
                                    <input type="password" id="confirmPassword" onChange={(e) => {setConfirmPassword(e.target.value);  let element = document.getElementById(e.target.id);
                                     element.classList.remove("error-input");}} className="form-control" placeholder="Enter your password" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Skills</label>
                                <input type="text" onChange={(e) => setSkills(e.target.value)} className="form-control" placeholder="Enter your skills" required />
                            </div>
                            <div className=" btn-div">
                                <label className="error  err-msg">{errMessage}</label><br />
                                <button type="submit" className="btn btn-submit btn-primary" onClick={registerHandle}>Register</button>
                                <label className="link-page">Have an account? <Link to={'/login'} className="text-deco">Login</Link></label>
                            </div>
                    </div></div></div>
        </div>
    )
}

export default Register
