import React, { Component, useRef } from 'react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

import image1 from '../img/mainpageright1.jpg'
import image2 from '../img/mainpageright2.jpg'
import image3 from '../img/mainpageright3.jpg'

const MainPageUnlogged = () => {
    const curtain = useRef(null)
    const imageRef3 = useRef(null)
    const imageRef2 = useRef(null)
    const imageRef1 = useRef(null)

    const handleGaleryActive = (e) => {
        if (e.target.classList.contains('active')) {
            imageRef1.current.classList.remove('active');
            imageRef2.current.classList.remove('active');
            imageRef3.current.classList.remove('active');
            curtain.current.classList.toggle('unlogged__curtain--active')
        } else {
            e.target.classList.toggle('active');
            curtain.current.classList.toggle('unlogged__curtain--active')
        }
    }
    const handleAboutSection = (e) => {
        document.querySelectorAll('.unlogged__about').forEach(e => {
            e.classList.remove('unlogged__about--active')
        })
        e.target.parentNode.classList.add('unlogged__about--active')
    }

    return (<>
        <div className="unlogged__wrap">
            <div className="unlogged__curtain active" ref={curtain} onClick={(e) => { handleGaleryActive(e) }}></div>
            <section className="unlogged__left-section">
                <div className="unlogged_left-wrap">
                    <div className="unlogged__about unlogged__about--active unlogged__about-1">
                        <h2 onClick={(e) => { handleAboutSection(e) }}>Who we are?</h2>
                        <p>We are highly motivated bunch of people, who want to create something that can break IT market. One idea, few specialist, lots of hours and a thousands lines of code. </p>
                    </div>
                    <div className="unlogged__about unlogged__about-2">
                        <h2 onClick={(e) => { handleAboutSection(e) }}>What we are doing?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quos incidunt numquam autem iure iusto architecto qui distinctio, beatae repellat animi, nostrum voluptatem quibusdam excepturi iste. Similique reprehenderit ipsam rerum.</p>
                    </div>
                    <div className="unlogged__about unlogged__about-3">
                        <h2 onClick={(e) => { handleAboutSection(e) }}>About STW App!</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aliquam, quidem animi nihil dignissimos aut officiis iusto nesciunt dolore debitis eum doloribus quia voluptates. Rem enim nihil dicta nesciunt dignissimos?</p>
                    </div>
                    <div className="unlogged__about unlogged__about-4">
                        <h2 onClick={(e) => { handleAboutSection(e) }}>Stuff</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate porro alias qui. Provident, suscipit consequuntur hic id, minus nobis perferendis maiores aspernatur quia repellendus ullam, qui dolorem voluptates incidunt.</p>
                    </div>
                </div>
            </section>
            <section className="unlogged__mid-section">
                <div className="unlogged__mid-wrap">
                    <h1 className="unlogged__mid-title">Join and Save Your World!</h1>
                    <button className="unlogged__btn-register">Register</button>
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
                    <img src={image3} alt='promo' ref={imageRef3} onClick={(e) => { handleGaleryActive(e) }} />
                    <img src={image2} alt='promo' ref={imageRef2} onClick={(e) => { handleGaleryActive(e) }} />
                    <img src={image1} alt='promo' ref={imageRef1} onClick={(e) => { handleGaleryActive(e) }} />
                </div>
            </section>
        </div>
    </>);
}

export default MainPageUnlogged;