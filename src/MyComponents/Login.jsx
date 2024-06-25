import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected import

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password:""});
    let navigate = useNavigate(); // Corrected hook usage

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save auth token in local storage
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully!", "success")
            navigate("/"); // Redirect to home
        } else {
            props.showAlert("Invalid Credientials!", "danger");
        }
    };
    const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2 className='mt-3'>Login to Continue to INotebook</h2>
  <div className="my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="my-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} required/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
