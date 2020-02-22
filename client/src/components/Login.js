import React, {useState} from "react";
import {axiosWithAuth} from './axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const username = ('')
  const password = ('')
  const [credentials, setCredentials] = useState({
    username: username,
    password: password
  })

  const handleChanges = e => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/protected');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('invalid Login', err)
      })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input onSubmit={login}
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChanges}
        />
        <input onSubmit={login}
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
