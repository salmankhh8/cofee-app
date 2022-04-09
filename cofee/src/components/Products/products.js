import React, { useState } from "react";
import "./Products.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const Products = () => {
  const [productImage, setProductImage] = useState();
  const [previewProductImage, setPreviewProductImage] = useState();
  const [supportingImage, setSupportingImage] = useState([]);
  const [sendProductImage, setSendProductImage] = useState();
  const [sendSupportingImage, setSendSupportingImage] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const userID=localStorage.getItem('userID');

  const coffeeType = [
    { value: "Arabica", label: "Arabica" },
    { value: "Robusta", label: "Robusta" },
    { value: "Black-Cofee", label: "Black-Cofee" },
    { value: "Decaf", label: "Decaf" },
    { value: "Espresso", label: "Espresso" },
    { value: "Latte", label: "Latte" },
    { value: "Cappuccino", label: "Cappuccino" },
    { value: "Macchiato", label: "Macchiato" },
    { value: "Americano", label: "Americano" },
    { value: "Café au Lait", label: "Café au Lait" },
    { value: "Cortado", label: "Cortado" },
    { value: "Flat White", label: "Flat White" },
    { value: "Mocha Latte", label: "Mocha Latte" },
    { value: "Red Eye", label: "Red Eye" },
    { value: "Irish Coffee", label: "Irish Coffee" },
    { value: "Iced Coffee(Cold Coffe)", label: "Iced Coffee(Cold Coffe)" },
    { value: "Iced latte(Cold Coffe)", label: "Iced latte(Cold Coffe)" },
    { value: "Cold Brew(Cold Coffe)", label: "Cold Brew(Cold Coffe)" },
    { value: "Nitro Cold Brew(Cold Coffe)", label: "Nitro Cold Brew(Cold Coffe)"},
    { value: "Flappe(Cold Coffe)", label: "Flappe(Cold Coffe)" },
  ];

  const [options, setOptions] = useState(coffeeType.label);

  const handleProductImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSendProductImage(file);
    previewProduct(file);
  };
  const previewProduct = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewProductImage(reader.result);
    };
  };

  const handleCoffe=(e)=>{
    // console.log(JSON.stringify(options));
    // setOptions(Array.isArray(e)?e.map(x=>x.label):[])
    setOptions(e.label)
  }

  const handleSupportingImage = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);

      setSupportingImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
    setSendSupportingImage(e.target.files);
  };

  const renderPhotos = (source) => {
    let i = 0;
    return source.map((photo) => {
      i++;
      return (
        <div
          style={{
            width: "20rem",
            height: "20rem",
            border: "1px solid #fff",
            textAlign: "center",
            display: "inline-block",
            verticalAlign: "middle",
          }}
          className={`add_supporting_image_${i}`}
        >
          <img
            style={{ width: "20rem", objectFit:"cover", height:"100%"}}
            src={photo}
            key={photo}
            alt="supporting will be here"
          />
        </div>
      );
    });
  };

  const handleSubmit = () => {
    console.log(options);
    const coffee =JSON.stringify(options)
    const FormData = require("form-data");

    let data = new FormData();
    for (let i = 0; i < sendSupportingImage.length; i++) {
      data.append("supportingImage", sendSupportingImage[i]);
    }

    data.append("ProductImage", sendProductImage);
    data.append("ownerID",userID )
    data.append("name", name);
    data.append("price", price);
    data.append("category",options );
    data.append("description", description);
    data.append("supportingImage", supportingImage);


    let config = {
      method: "post",
      url: "http://localhost:4000/productimage",
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.supportingImage_URL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="add_Product_Container">
        <div className="add_upload_Image">
          <div className="upload_main_image">
            {previewProductImage && (
              <img
                style={{ width: "43rem", objectFit:"cover", height: "100%" }}
                src={previewProductImage}
                alt="supporting"
              />
            )}
          </div>

          {renderPhotos(supportingImage)}
        </div>
        <div className="add_product_item">
          <h1>Tell Us about the product You Want to add</h1>
          <div>
            <br />
            <form method="post" enctype="multipart/form-data">
              <label for="file1">
                {" "}
                <h2>Upload Your Product Image</h2>{" "}
                <FontAwesomeIcon
                  title="Image Will be showing to Coustomer"
                  icon={faFileCircleExclamation}
                />
              </label>

              <input
              className="btn"
              style={{ width:"40rem"}}
                type="file"
                onChange={handleProductImage}
                value={productImage}
                name="file1"
                required="required"
              />
              <br />
            <br />


              <label for="file2">
                
                <h2>Other Images Of Your Product</h2>
                <FontAwesomeIcon
                  title="images showing the details of your product eg: description, wrranty, usermaual, etc"
                  icon={faFileCircleExclamation}
                />

              </label>
              <input
              className="btn"
              style={{ width:"40rem"}}

                onChange={handleSupportingImage}
                id="supportingImage"
                type="file"
                name="file2"
                required
                multiple
              />
              <div className="add_product_name">
                <label htmlFor="title">Name of Product</label>
                <br />
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="inputDropDown">
                <span style={{ fontSize: "2.4rem" }} className="fa fa-mug-hot">
                  <label>Select The Type of Coffee</label>
                </span>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "rgb(63, 28, 28)",
                    backgroundColor: "black",
                  }}
                >
                  <Select
                    options={coffeeType}
                    onChange={handleCoffe}
                    isSearchable
                  ></Select>
                </div>
              </div>

              <div className="add_product_price">
                <label>price</label>
                <br />
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="add_product_description">
                <label>description</label>
                <br />
                <textarea
                  rows="3"
                  column="10"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit}  className="btn" type="button">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
