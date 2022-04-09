import React,{useState} from 'react'
import "./Home.css" 
import {Link} from "react-router-dom"

const Home = () => {


  return (
    <>
    {/* <div className="icons">
      <div>
    <FontAwesomeIcon icon={faCoffee} />
      </div>
      <div>
    <FontAwesomeIcon icon={faSearch} />
      </div>  <div>
    <FontAwesomeIcon icon={faEnvelope} />
      </div>
    </div> */}

    {/* home section */}

  

{/* About Sectipon */}
<section   className="home" id="home">
      <div  className="content">
        <h3>Fresh cofee in the morning</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          aliquid eos animi sunt, debitis exercitationem perferendis veritatis
          laudantium quibusdam
        </p>
        <a href="#" className="btn">get yours now</a>
      </div>
    </section>

    {/* <!--About section start here--> */}
    <section className="about" id="about">
      <h1 className="heading"><span>about</span> us</h1>

      <div className="row">
        <div className="image">
          <img src="images/about-img.jpeg" alt="about"  />
        </div>
        <div className="content">
          <h3>What our cofee makes Special?</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi sequi
            dignissimos aspernatur excepturi pariatur odit ut qui molestias,
            blanditiis vel nihil minima laborum repudiandae sit illum beatae
            aperiam asperiores. Beatae.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta ut
            laboriosam delectus saepe enim suscipit debitis, velit nemo qui,
            repellat veritatis ad ipsa odit esse tenetur blanditiis, voluptatem
            veniam consequuntur.
          </p>
          <a href="#" className="btn"> learn more</a>
        </div>
      </div>
    </section>

    {/* <!--Menu section--> */}


    {/* <!--Products section--> */}

    <section className="products" id="products">
      <h1 className="heading">our <span>products</span></h1>

      <div className="box-container">
        <div className="box">
          <div className="icons">
            <a href="#" className="fas fa-shopping-cart"></a>
            <a href="#" className="fas fa-heart"></a>
            <a href="#" className="fas fa-eye"></a>
          </div>
          <div className="images">
            <img src="images/product-1.png" alt="" />
          </div>
          <div className="content">
            <h3>fresh cofee</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <div className="price">
              20.00$
            </div>
            <div>
            <Link to="/products"><button className="btn">View More</button></Link>

            </div>
          </div>
        </div>

        <div className="box">
          <div className="icons">
            <a href="#" className="fas fa-shopping-cart"></a>
            <a href="#" className="fas fa-heart"></a>
            <a href="#" className="fas fa-eye"></a>
          </div>
          <div className="images">
            <img src="images/product-2.png" alt="" />
          </div>
          <div className="content">
            <h3>fresh cofee</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <div className="price">
              20.00$
            </div>
            <div>
            <Link to="/products"><button className="btn">View More</button></Link>

            </div>
          </div>
        </div>

        <div className="box">
          <div className="icons">
            <a href="#" className="fas fa-shopping-cart"></a>
            <a href="#" className="fas fa-heart"></a>
            <a href="#" className="fas fa-eye"></a>
          </div>
          <div className="images">
            <img src="images/product-3.png" alt="" />
          </div>
          <div className="content">
            <h3>fresh cofee</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <div className="price">
             $20.00
            </div>
            <div>
           <Link to="/products"><button className="btn">View More</button></Link>

            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <!--review section statrs here--> */}
    <section className="review" id="review">
      <h1 className="heading">customer's <span>review</span></h1>
      <div className="box-container">
        <div className="box">
          <img src="images/quote-img.png" alt=""  />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At cumque
            officiis totam consequuntur iure veritatis quidem molestiae ut
            ratione. Facilis quod officia voluptate id quaerat excepturi sit
            similique nulla voluptates.
          </p>
          <img src="images/pic-1.png" className="user" alt="" />

          <h3>john deo</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>

        <div className="box">
          <img src="images/quote-img.png" alt=""  />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At cumque
            officiis totam consequuntur iure veritatis quidem molestiae ut
            ratione. Facilis quod officia voluptate id quaerat excepturi sit
            similique nulla voluptates.
          </p>
          <img src="images/pic-2.png" className="user" alt="" />

          <h3>john deo</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>

        <div className="box">
          <img src="images/quote-img.png" alt=""  />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At cumque
            officiis totam consequuntur iure veritatis quidem molestiae ut
            ratione.
          </p>
          <img src="images/pic-3.png" className="user" alt="" />

          <h3>john deo</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>
      </div>
    </section>

    {/* <!--contact section--> */}

    <section className="contact" id="contact">
      <h1 className="heading"><span>contact</span>us</h1>
      <div className="row">
        <iframe
          className="map"
          srcSet="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29449.209114069065!2d75.85464083955081!3d22.685416899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd35ddf3395d%3A0x27b300ba36e4530b!2sInfoBeans%20Technologies%20Limited!5e0!3m2!1sen!2sin!4v1646050966858!5m2!1sen!2sin"
          width="600" height="450"
          style={{border: "0"}}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <form action="">
          <h3>get in touch</h3>
          <div className="inputBox">
            <span className="fas fa-user"></span>
            <input type="text" placeholder="Name" />
          </div>
          <div className="inputBox">
            <span className="fas fa-envelope"></span>
            <input type="email" placeholder="email" />
          </div>
          <div className="inputBox">
            <span className="fas fa-phone"></span>
            <input type="number" placeholder="number" />
          </div>
        </form>
      </div>
    </section>

    {/* <!-- blogs section --> */}

    <section className="blogs" id="blogs">
      <h1 className="heading">our <span>blogs</span></h1>

      <div className="box-container">
        <div className="box">
          <div className="image">
            <img src="images/blog-1.jpeg" alt="" />
          </div>
          <div className="content">
            <a href="" className="title">tasty and refreshing cofee</a>
            <span>by admin/ 21st may, 2021 </span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <a href=""  className="btn">read more</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/blog-2.jpeg" alt="" />
          </div>
          <div className="content">
            <a href="" className="title">tasty and refreshing cofee</a>
            <span>by admin/ 21st may, 2021 </span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <a href="" className="btn">read more</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/blog-3.jpeg" alt="" />
          </div>
          <div className="content">
            <a href="" className="title">tasty and refreshing cofee</a>
            <span>by admin/ 21st may, 2021 </span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <a href="" className="btn">read more</a>
          </div>
        </div>

        
      </div>
    </section>

    {/* <!-- footer section starts here --> */}

    <section className="footer">
      <div className="share">
        <a href="" className="fab fa-facebook-f"></a>
        <a href="" className="fab fa-twitter"></a>
        <a href="" className="fab fa-instagram"></a>
        <a href="" className="fab fa-linkedin"></a>
        <a href="" className="fab fa-pinterest"></a>
      </div>

      <div className="links">
        <a href="#home">home</a>
        <a href="#about">about</a>
        <a href="#menu">menu</a>
        <a href="#products">products</a>
        <a href="#review">review</a>
        <a href="#contact">contacts</a>
        <a href="#blogs">blogs</a>
      </div>
      <div className="credit">created by <span>Salman khan</span> | all rights reserved</div>
    </section>
    </>
  )
}

export default Home