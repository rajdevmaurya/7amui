"use client"
import React, { useEffect, useRef } from 'react'
import styles from './Home.module.css'
const Home = () => {
    const imgRef = useRef()
    useEffect(() => {
        const hanldeScroll = () => {
            if (isElementPartiallyVisible(imgRef.current)) {
                console.log(1)
                imgRef.current.classList.add("homeImgAnim")
            }
        }
        window.addEventListener('scroll', hanldeScroll)
        hanldeScroll();
        return () => {
            window.removeEventListener("scroll", hanldeScroll)
        }

    }, [])
    const isElementPartiallyVisible = (element) => {
        var rect = element.getBoundingClientRect();
        var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    }

    return (
        <div className='container-fluid'>
            <h3 className={`text-center my-3 ${styles.homeHeading}`} >Welcome....</h3>
            <p>
                Helping Businesses Grow with Innovative Helthcare Sale Service Solutions
                Welcome to Echo Helathcare Services! We specialize in providing comprehensive Medical solutions that empower businesses to thrive. We harness cutting-edge technologies to optimize processes, enhance productivity, and drive growth, enabling our clients to stay ahead in today's digital landscape.
            </p>
            <div className='row'>
                <div className='col-6 position-relative'>
                    <div className={`${styles.headingText}`}>
                        <h1>
                            the Power of

                        </h1>
                        <h3>
                            Technology for Your Healthcare Business
                        </h3>
                    </div>
                    <div className={`${styles.headerText2} position-absolute`}>
                        <p>Unlock New Opportunities with Scalable and Secure Healthcare Solutions,</p>
                        <p>Get in touch with our Expert for same.</p>
                    </div>
                </div>
                <div className='col-4'>
                    <img ref={imgRef} id="homeImg" className={`w-100 ${styles.homeImg}`} src="home.png"></img>
                </div>
            </div>

        </div>
    )
}

export default Home
