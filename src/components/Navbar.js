import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { useAuth } from "./Auth/context";

const Navbar = (props) => {
  const { setAuthTokens } = useAuth();
  const handleLogout = () => {
    setAuthTokens(null);
    localStorage.clear()
  }
  return (
    <div className="row navbar-row">
      <div className="col-md-2 offset-md-1"><Link to={'/'} className="text-dec"><h2>MyJobs</h2></Link></div>
      <div className="col-md-2 offset-md-7">
        {!props.token &&
          <button className="login-btn"><Link to={'/login'} className="text-dec">Login/Signup</Link></button>
        }
        {props.token && <div><Link to={'/postjob'} className="text-dec">Post Job</Link>
          <button onClick={handleLogout} className="login-btn"><Link to={'/login'} className="text-dec">Logout</Link></button>
        </div>}

      </div>
      <hr></hr>
    </div>
  )
}

export default Navbar
