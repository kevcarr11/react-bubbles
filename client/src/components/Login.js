import React, { useState } from "react";
import axiosWithAuth from "./utils/axiosWithAuth"
import { Spinner } from 'reactstrap';

const Login = (props) => {
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
    e.preventDefault()
    setIsLoading(true)
    axiosWithAuth()
      .post("/api/login", userInfo)
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.payload)
        props.history.push("/BubblePage")
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.response.data.error)
      })
  }


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <input className="loginInput" type="text" name="username" placeholder=" User Name" value={userInfo.username} onChange={handleChange} />
          <input className="loginInput" type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} />

          <button type="submit">{isLoading ? <Spinner/> : "Login"}</button>
        </form>
      </div>
    </>
  );
};

export default Login;
