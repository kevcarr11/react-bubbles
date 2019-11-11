import React, { useState } from "react";
import { Spinner } from 'reactstrap';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = (e) => {

  }


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form>
          <input type="text" name="username" placeholder=" User Name" value={userInfo.username} onchange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={userInfo.password} onchange={handleChange} />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
