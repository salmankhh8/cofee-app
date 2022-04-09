import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import LoaderSkeleton from "../loader/LoaderSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./DisplayProduct.css";

const DsiplayProduct = () => {
  const [loading, setLoading] = useState(true);
  const [loadingbar, setLoadingBar] = useState(true);
  let   [product, setProduct] = useState([]);
  const [tempProduct, setProductTemp] = useState([]);
  const [category, setCategory] = useState(false);

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
    {
      value: "Nitro Cold Brew(Cold Coffe)",
      label: "Nitro Cold Brew(Cold Coffe)",
    },
    { value: "Flappe(Cold Coffe)", label: "Flappe(Cold Coffe)" },
  ];

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:4000/productimage",
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setProduct(response.data);
        setProductTemp(response.data);
        console.log(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategory = () => {
    category ? setCategory(false) : setCategory(true);
  };

  const handleCoffeeItem = (value) => {
    product = tempProduct;
    let filterData = [];
    filterData = product.filter((curItem) => {
      return curItem.category == value;
    });
    setProduct(filterData);
    console.log(value);
  };

  const handleAddToCart = (pId) => {};
  return (
    <>
      <div className="add_product_button">
        <div className="catagory_mobile" onClick={handleCategory}>
          <FontAwesomeIcon icon={faEllipsisV} /> Category
        </div>
        {localStorage.getItem("userID") && (
          <div className="product_button">
            <Link to="/add_products">
              {" "}
              <button className="btn">Add Products</button>
            </Link>
          </div>
        )}
      </div>
      <div className="DisplayProduct">
        <div
          className={
            category
              ? " product_Category product_Category_600"
              : "product_Category "
          }
        >
          {coffeeType.map((index) => {
            return (
              <div
                className="Product_Category_Details"
                onClick={() => handleCoffeeItem(index.value)}
              >
                {index.value}
              </div>
            );
          })}
        </div>

        <div className="displaySelectedProduct">
          {loading !== false ? (
            <LoaderSkeleton />
          ) : (
            <div className="product_display_parent">
              {product.map((index, key) => {
                return (
                  <div className="product_display_children">
                    <div className="product_display_children_Image">
                      <img key={key} src={index.productImage_URL} />
                    </div>
                    <div className="product_display_children_title">
                      <p key={key}>{index.name}</p>
                    </div>
                    <div className="product_display_children_price">
                      <p key={key}>
                        <span>Price :</span> ₹ {index.price}
                      </p>
                    </div>
                    <div className="product_display_children_description">
                      <p key={key}>
                        <span>Category :</span>
                        {index.category}
                      </p>
                    </div>
                    <div className="product_display_children_description">
                      <p key={key}>
                        <span>description:</span> {index.description}
                      </p>
                    </div>
                    <div className="product_display_children_button">
                      <Link to={`/selecteditem/${index._id}`}>
                        <button key={key} className="btn">
                          View
                        </button>
                      </Link>
                    </div>
                    <div className="product_display_children_button">
                      <Link to={`/addtocart/${index._id}`}>
                        {" "}
                        <button
                          key={key}
                          onCLick={handleAddToCart(index._id)}
                          className="btn"
                        >
                          Add To Cart
                        </button>{" "}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default DsiplayProduct;
