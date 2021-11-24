import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home'
import Navbar from './components/Navbar'
import {BrowserRouter, Route  } from 'react-router-dom'
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import { useState } from 'react'
import { AuthContext } from "./components/Auth/context";
import PrivateRoute from './privateRoute';
import Dashboard from './components/Jobs/Dashboard';
import PostJob from './components/Jobs/PostJob';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <div >
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
      <Navbar token={ authTokens } />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/postjob" component={PostJob} />
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
