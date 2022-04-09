import React, { useEffect, useState } from "react";
import axios from "axios";
import "./editProfile.css";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const EditProfile = () => {
  const [editName, setEditName] = useState();
  const [image, setImage] = useState();
  const [editNumber, setEditNumber] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editPassword, setEditPassword] = useState();
  const userID = localStorage.getItem("userID");
  const [previewImageSource, setPreviewImageSource] = useState();

  const styles = {
    largeIcon: {
      width: "50px",
      height: "50px",
    },
  };

  useEffect(() => {
    axios({
      url: `http://localhost:4000/upload/${userID}`,
      method: "get",
      headers: {},
    }).then((response) => {
      setEditName(response.data.name);
      setEditDescription(response.data.description);
      setEditNumber(response.data.number);
      console.log(response.data);
      setImage(response.data.profile_URL);
    });
  }, []);

  const sendData = () => {
    console.log(editName, editNumber, editDescription, editPassword);
    let data = new FormData();
    data.append("name", editName);
    data.append("description", editDescription);
    data.append("password", editPassword);
    data.append("number", editNumber);
    data.append("user", image);

    let config = {
      method: "put",
      url: `http://localhost:4000/upload/${userID}`,
      data: data,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImageSource(reader.result);
    };
  };
  return (
    <>
      <div className="edit_Container">
        <div className=" edit image">
          <img
            style={{ width: "20rem", height: "20rem" }}
            src={previewImageSource ? previewImageSource : image}
          />
          <input
            id="previewImageSource"
            style={{ display: "none" }}
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="previewImageSource">
            <AddPhotoAlternateIcon
              style={styles.largeIcon}
              fontSize="large"
              variant="contained"
            />
          </label>
        </div>
        <div className=" edit name">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            type="text"
          />
        </div>
        <div className=" edit password">
          <input
            onChange={(e) => setEditPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className=" edit number">
          <input
            onChange={(e) => setEditNumber(e.target.value)}
            value={editNumber}
            type="text"
          />
        </div>
        <div className=" edit description">
          <textarea
            name="description"
            onChange={(e) => setEditDescription(e.target.value)}
            value={editDescription}
            id=""
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="item save">
          <button className="btn" onClick={sendData}>
            save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
