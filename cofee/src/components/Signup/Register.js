import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [fiel, setFiel] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();
  const [description, setDescription] = useState();


  const handleFileInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiel(file);
    previewFile(file); // call a function and pass file as aparameter
  };

  const previewFile = (file) => {
    const reader = new FileReader(); //filereader for js api
    reader.readAsDataURL(file); // convert image to fileurl
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const send = () => {
    var dt = new Date();
    const date =
      (dt.getMonth() + 1 < 10 ? "0" : "") +
      (dt.getMonth() + 1) +
      "/" +
      dt.getFullYear();
    console.log(date);

    
    const data = new FormData();
    data.append("user", fiel);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("number", number);
    // data.append("category",coffee );
    data.append("date", date);
    data.append('description',description);
    axios({
      url: "http://localhost:4000/upload",
      method: "POST",
      data: data,
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <>
      <div className="register">
        <section className="contact" id="contact">
          <h1 className="heading">
            <span>Register</span> here
          </h1>
          <div className="crop">
            {previewSource && <img src={previewSource} />}
          </div>
          <div className="row">
            <form action="#" method="post" encType="multipart/form-d">
              <div className="inputBox">
                <span className="fas fa-user"></span>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="false"
                />
              </div>
              <div className="inputBox">
                <span className="fas fa-envelope"></span>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  autoComplete="off"
                />
              </div>
              <div className="inputBox">
                <span className="fas fa-lock"></span>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="inputBox">
                <span className="fas fa-lock"></span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="off"
                />
              </div>
              <div className="inputBox">
                <span className="fas fa-phone"></span>
                <input
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="number"
                  autoComplete="off"
                />
              </div>
              <div className="inputBox">
                <span className="fas fa-image"></span>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  placeholder="your image"
                  autoComplete="off"
                />
              </div>
              <div className="textArea">
                <span className="fas fa-pen">
                  <label htmlFor="textarea">Description</label>
                </span>
                <textarea
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="write few lines which describe your services"
                  autoComplete="off"
                />
              </div>
             
              <input
                type="button"
                onClick={send}
                value="Register"
                className="btn"
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
