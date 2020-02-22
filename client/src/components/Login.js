import React, {useState} from "react";
import {axiosWithAuth} from './axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const [credentials, setCredentials] = useState({
      username: username,
      password: password
   })

  console.log('username', credentials)
  console.log('password', credentials.password)

  const handleChanges = e => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
}

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log('res', res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/protected');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('invalid Login', err)
      })
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
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
    </div>
  );
};

export default Login;
