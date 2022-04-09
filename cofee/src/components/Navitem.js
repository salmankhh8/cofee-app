import React,{useState} from 'react'
import { Outlet } from 'react-router'
import "./Home.css"
import {Link} from "react-router-dom"

const Navitem = () => {

    const [MenuToggle, setMenuToggle]=useState(false)
    const [cartItem, setCartItem]=useState(false)
    const [searchItem, setSearchItem]=useState(false)
    const [user, setUser]=useState(false)
  
    const toggleMenuBtn=()=>{
      MenuToggle ? setMenuToggle(false) : setMenuToggle(true)
      setCartItem(false)
      setSearchItem(false)
      setUser(false)
    }
  
    const toggleSearchItem=()=>{
      searchItem ? setSearchItem(false) : setSearchItem(true)
      setCartItem(false)
      setMenuToggle(false)
      setUser(false)
    }
  
    const toggleCartItem=()=>{
      cartItem ? setCartItem(false) : setCartItem(true)
      setMenuToggle(false)
      setSearchItem(false)
      setUser(false)
    }
    const toggleUser=()=>{
      user ? setUser(false) : setUser(true)
      setCartItem(false)
      setSearchItem(false)
      setMenuToggle(false)

    }
    

  return (
    <>
      <header className="header">
        
      <a href="#" className="logo">
        <img src="images/logo.png" alt="logos" />
      </a>

      <nav className= {MenuToggle ? "navbar active" :"navbar" }>
        <Link to="/home">Home</Link>
        <a href="#about">About </a>
        <a href="#menu">Menu</a>
        <Link to="/products">Products</Link>
        <a href="#review">Review</a>
        <a href="#contact">Contact</a>  
        <a href="#blogs">Blogs</a>
        <Link to="/profile">Profile</Link>
      </nav>  

      <div  className="icons ">
        <div className="fas fa-search" onClick={toggleSearchItem}  id="search-btn"></div>
        <div className="fas fa-user  dropbtn" onClick={toggleUser} id="user-btn"></div>
          <div className={ user ? "dropdown active" :"dropdown "}>
           <Link to="/login"> <a onClick={toggleUser}>Login</a></Link>
           <Link to="/register"> <a onClick={toggleUser}>Register</a></Link>
          </div>
      
        <div className="fas fa-shopping-cart" onClick={toggleCartItem}  id="cart-btn"></div>
        <div className="fas fa-bars" onClick={toggleMenuBtn}  id="menu-btn"></div>
      </div>

{/* .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<div class="dropdown">
  <span>Mouse over me</span>
  <div class="dropdown-content">
  <p>Hello World!</p>
  </div>
</div> */}

      
      <div className={searchItem ? "search-form active" : "search-form"}>
        <input
          type="search"
          name=""
          id="search-box"
          placeholder="search here..."
        />
        <label htmlFor="search-box" className="fas fa-search"></label>
      </div>

      <div className={ cartItem ? "cart-items-container active" : "cart-items-container" }>
        <div className="cart-items">
          <span className="fas fa-times"></span>
          <img src="./images/cart-item-1.png" alt=""  />
          <div className="content">
            <h3>cart item 01</h3>
            <div className="price">$15.99/-</div>
          </div>
        </div>
        <div className="cart-items">
          <span className="fas fa-times"></span>
          <img src="./images/cart-item-2.png" alt=""  />
          <div className="content">
            <h3>cart item 02</h3>
            <div className="price">$15.99/-</div>
          </div>
        </div>
        <div className="cart-items">
          <span className="fas fa-times"></span>
          <img src="./images/cart-item-3.png" alt=""  />
          <div className="content">
            <h3>cart item 03</h3>
            <div className="price">$15.99/-</div>
          </div>
        </div>
        <div className="cart-items">
          <span className="fas fa-times"></span>
          <img src="./images/cart-item-4.png" alt=""  />
          <div className="content">
            <h3>cart item 04</h3>
            <div className="price">$15.99/-</div>
          </div>
        </div>
        <a href="#" className="btn">checkout now</a>
      </div>
    </header>
    <div>
    <Outlet />

    </div>
    </>
  )
}

export default Navitem