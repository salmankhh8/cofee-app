
import React, { useEffect, useState } from 'react'
import "./addToCart.css"
import {useParams} from "react-router"
import axios from 'axios'
const AddToCart = () => {

    const[cartitem, setCartItem]=useState({})
    const [count, setCount]=useState(0)
    var params= useParams()


    useEffect(()=>{
        var productcartId=params._id;
        let config={
            method: "get",
            url: `http://localhost:4000/productimage/${productcartId}`,  
        }
        axios(config)
        .then((response) => {
            setCartItem(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

  return (
      <div className="add_to_cart">
    <div className="add_to_cart_userDetails">
        <div className="cart_Images_div">
        <img style={{width: "12rem"}} src={cartitem.productImage_URL} alt="" />
        </div>
        <div className="cart_item_name">
        {cartitem.name}
        </div>
        <div className="cart_item_quantity">
        <button onClick={()=>setCount(count+1)}>+</button><input onChange={(e)=>setCount(e.target.value)} value={count} type="number" />
        {
            count>0 &&  <button onClick={()=>setCount(count-1)}>-</button>

        }
        </div>
        <div className="remove_cart_item">
            <button className="removeButton">Remove</button>
        </div>
    </div>
    <div className="add_to_cart_Price">
    </div>
      </div>
  )
}

export default AddToCart