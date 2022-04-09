import React, { useState } from "react";
import "./Login.css"
import axios from "axios";
const Login = () => {
  const[email ,setEmail] =useState();
  const[password ,setPassword] =useState();  
  const loginUser=()=>{
var data = {
  "email": `${email}`,
  "password":`${password}`,
};

var config = {
  method: 'post',
  url: 'http://localhost:4000/upload/login',
  data : data
};

axios(config)
.then(function (response) {
  localStorage.setItem('userID',(response.data.data._id))
})
.catch(function (error) {
  console.log(error);
});

  }

  return (

    <div className="login"> 
    {/* <img src="https://images3.alphacoders.com/941/thumb-1920-94135.jpg" alt="" srcset="" /> */}
    <section className="contact" id="contact">
      <h1 className="heading">Login To <span>Coffee</span></h1>
      <div className="row">
        <form action="">
          <div className="inputBox">
            <span className="fas fa-envelope"></span>
            <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}  autocomplete="off" />
          </div>
          <div className="inputBox">
            <span className="fas fa-lock"></span>
            <input type="password" placeholder="number" onChange={(e)=>setPassword(e.target.value)} autocomplete="off" />
          </div>
          <input type="button" onClick={loginUser} value="Login" className="btn" />
        </form>
      </div>
    </section>
    
    
    </div>
  );
};

export default Login;
