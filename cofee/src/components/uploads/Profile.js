import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import {Link} from 'react-router-dom'

const Profile = () => {
  const [userDetail, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const UserId = localStorage.getItem("userID");

  useEffect(() => {
    axios({
      url: `http://localhost:4000/upload/${UserId}`,
      method: "get",
      headers: {},
    }).then((response) => {
      setUserDetails(response.data);
      console.log(response.data);
      setLoading(true);
      console.log(userDetail);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="item item-1">
        <img style={{width:'20rem', height:'20rem'}} src={userDetail.profile_URL} alt="" />
          </div>
        <div className="item item-2">
          <div className="name">
            {" "}
            <h1>{userDetail.name}</h1>
           <Link to="/editProfile"><button  className="btn">Edit Profile</button></Link>
          </div>
          <div style={{ display: "flex" }} className="member">
            <h5 style={{ paddingRight:'1rem' }}>member since</h5> {userDetail.date}
          </div>
          <div  className="ratings">ratings{ !userDetail.rating ? <p>no ratings available</p>:<p>{userDetail.rating}</p> }</div>
        </div>
        <div className="item item-3">
          <div className="contact">message</div>
          <div className="contact"> contact</div>
          <div className="contact">Report</div>
        </div>
        <div className="item item-4">
          <div className="about">About</div>
          <div className="field">filed1</div>
          <div className="description">des1</div>
          <div className="field">field2</div>
          <div className="description">dec2</div>
          <div className="field">field3</div>
          <div className="description">des3</div>
          <div className="field">field4</div>
          <div className="description">des4</div>
        </div>
        <div className="item item-5">item 5</div>
        <div className="item item-6">Category product</div>
        <div className="item item-7">{userDetail.description}</div>
      </div>
    
    </>
  );
};

export default Profile;
