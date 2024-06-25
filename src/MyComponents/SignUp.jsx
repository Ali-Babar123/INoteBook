import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name: "", email:"", password:"", cpassword: ""});
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name, email, password} = credentials;
   const response = await fetch("http://localhost:5000/api/auth/createuser",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
});
const json = await response.json();
console.log(json);
if (json.success) {
    // Save auth token in local storage
    localStorage.setItem('token', json.authtoken);
    navigate("/"); // Redirect to home
    props.showAlert("Account Created Successfully", "success")
} else {
    props.showAlert("Invalid Credentials", "danger")
}
};
  const handleChange = (e) =>{
     setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2 className='my-3'>Create an Acount to use INoteBook</h2>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={handleChange} required />
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={handleChange}  minLength={5} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword"  name='cpassword' onChange={handleChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>

    </div>
  )
}

export default SignUp
