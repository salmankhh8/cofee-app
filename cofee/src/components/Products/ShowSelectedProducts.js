import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./ShowSelected.css";
import axios from "axios";
import LoaderCircle from "../loader/LoaderCircle";
const ShowSelectedProducts = () => {
  const [images, setImages] = useState({});
  const [sImages, setSImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState();
  var params = useParams();

  useEffect(() => {
    var productId = params._id;
    let config = {
      method: "get",
      url: `http://localhost:4000/productimage/${productId}`,
    };

    axios(config)
      .then((response) => {
        setImages(response.data);
        setSImages(response.data.supportingImage_URL);
        setLoading(false);
        // console.log(sImages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleClickImage = (imageURL) => {
    setSelectedImage(imageURL);
  };

  return (
    <div className="showDetails_product">
      {loading === true ? (
        <LoaderCircle />
      ) : (
        <>
          <div className="leftFlexImageDetails">
            <div className="showDetails_product_image">
              <div className="otherimages">
                <div className="Product_Image">
                  <img
                    className={selectedImage===images.productImage_URL ? " active_image":"Product_Image"}
                    src={images.productImage_URL}
                    alt=""
                    onClick={() => handleClickImage(images.productImage_URL)}
                  />
                </div> 

                {
                sImages.map((index) => {
                  return (
                    <div >
                      <img
                        onClick={() => handleClickImage(index)}
                        className={ selectedImage===index ?" active_image" :"supportingImage"}
                        src={index}
                      />
                    </div>
                  );
                })
                }
              </div>
              <div className="show_user_image ">
                {selectedImage ? (
                  <img src={selectedImage} />
                ) : (
                  <img src={images.productImage_URL} alt="" />
                )}
              </div>
            </div>
          </div>

          <div className="showDetails_product_Specification">
            {" "}
            <h1>{images.name}</h1>
            <p>{images.rating}</p>
            <h2>Special Price ₹{images.price}</h2>
            <h3> Category : {images.category}</h3>
            <p> Description: {images.description}</p>
            <button className="btn"> Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowSelectedProducts;
