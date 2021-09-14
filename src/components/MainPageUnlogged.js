import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

//Components
import Canvas from "./Canvas";

//Images
import image1 from "../img/mainpageright1.gif";
import image2 from "../img/mainpageright2.png";
import image3 from "../img/mainpageright3.gif";

//Tools
import { ParticlesFunc } from "../tools/particles";

const MainPageUnlogged = () => {
  const curtain = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef1 = useRef(null);

  const aboutSection1 = useRef(null);
  const aboutSection2 = useRef(null);
  const aboutSection3 = useRef(null);
  const aboutSection4 = useRef(null);

  useEffect(() => {
    ParticlesFunc();
  }, []);

  const handleGaleryActive = (e) => {
    if (e.target.classList.contains("active")) {
      imageRef1.current.classList.remove("active");
      imageRef2.current.classList.remove("active");
      imageRef3.current.classList.remove("active");
      curtain.current.classList.toggle("unlogged__curtain--active");
    } else {
      e.target.classList.toggle("active");
      curtain.current.classList.toggle("unlogged__curtain--active");
    }
  };

  const handleAboutSection = (e) => {
    const sections = [aboutSection1,aboutSection2,aboutSection3,aboutSection4];
    sections.forEach(section=>{
      section.current.classList.remove('unlogged__about--active')})
    e.target.parentNode.classList.add("unlogged__about--active");
  };

  return (
    <>
      <main className="unlogged__wrap">
        <Canvas></Canvas> 
        <canvas
          className="canvas-particles"
          id="myCanvas"
          width="1424"
          height="1200"
        ></canvas>
        <div
          className="unlogged__curtain active"
          ref={curtain}
          onClick={handleGaleryActive}
        ></div>
        <section className="unlogged__left-section">
          <div className="unlogged_left-wrap">
            <div className="unlogged__about unlogged__about--active unlogged__about-1" ref={aboutSection1}>
              <h2

                onClick={handleAboutSection}
              >
                Who we are?
              </h2>
              <p>
                We are highly motivated bunch of people, who want to create
                something that can break IT market. One idea, few specialist,
                lots of hours and a thousands lines of code.{" "}
              </p>
            </div>
            <div className="unlogged__about unlogged__about-2" ref={aboutSection2}>
              <h2
              
                onClick={handleAboutSection}
              >
                What are we doing?
              </h2>
              <p>
                Right now we are mainly focus on Save The World project, that we
                believe in. We are almost sure, that this application can break
                the IT market! This project is written in JSES6 and HTML5 with
                CSS3 standards with REACT and REDUX technology on front-end and
                NODEJS on back-end.
              </p>
            </div>
            <div 
                className="unlogged__about unlogged__about-3"
                ref={aboutSection3}>
              <h2
              
                onClick={handleAboutSection}
              >
                About STW App!
              </h2>
              <p>
                STW (Save The World) is created to help You remember all places
                you have been. With markups and descriptions where You can write
                Your memories, this memories will be saved for eternity!
              </p>
            </div>
            <div className="unlogged__about unlogged__about-4" ref={aboutSection4}>
              <h2
              
                onClick={handleAboutSection}
              >
                Stuff
              </h2>
              <p>
                The owner of STW (Save The World) app is MisiekKisiek company.
                If You have any sugestions or You want to work with us, send us
                a message on email adress: MiśkiKiśki@stw.com.
              </p>
            </div>
          </div>
        </section>
        <section className="unlogged__mid-section">
          <div className="unlogged__mid-wrap">
            <h1 className="unlogged__mid-title">Join and Save The World!</h1>
            <div className="unlogged__line-1">
              <NavLink to="/register" className="unlogged__register-button">
                Register
              </NavLink>
            </div>
            <div className="unlogged__line-2"></div>
            <div className="unlogged__line-3">
              <NavLink to="/login" className="unlogged__login-button">
                Login
              </NavLink>
            </div>
            <div className="unlogged__line-4"></div>
          </div>
        </section>
        <section className="unlogged__right-section">
          <div className="unlogged__img-wrap">
            <div className="unlogged__arrow-wrap">
              <div className="unlogged__arrow"></div>
            </div>
            <div className="unlogged__arrow-wrap">
              <div className="unlogged__arrow"></div>
            </div>
            <div className="unlogged__check">Check!</div>
            <img
              src={image3}
              alt="promo"
              ref={imageRef3}
              onClick={handleGaleryActive}
            />
            <img
              src={image2}
              alt="promo"
              ref={imageRef2}
              onClick={handleGaleryActive}
            />
            <img
              src={image1}
              alt="promo"
              ref={imageRef1}
              onClick={handleGaleryActive}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPageUnlogged;
