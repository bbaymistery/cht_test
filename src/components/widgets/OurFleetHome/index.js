import React, { useEffect } from 'react'
import styles from "./styles.module.scss"
const OurFleetHome = () => {
    // Our Fleet
    useEffect(() => {
        $('.owl-carousel1').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            pagination: true,
            navText: "",
            responsive: {
                0: {
                    items: 1
                },
                490: {
                    items: 2
                },
                710: {
                    items: 3
                },
                920: {
                    items: 4
                },
            }
        })
    }, [])



    return (

        <section className={`content-wrapper-outer content-wrapper clearfix our-fleet-sections ${styles.fleet_content}`}>

            <h3 className={`center-title ${styles.fleet_title}`}>Our Fleet</h3>
            <div className={`title-block2 ${styles.title_block2}`}></div>

            <p className={`fleet-intro-text ${styles.intro_text}`}>
                <strong>
                    Churchill Transfers is a true London airport transfer specialist.</strong>
                Our offices are located a stone’s throw from Heathrow Airport. Picking up passengers from London airports and driving them in to Central London is what we do all day,
                every day. We know the speediest routes, the handiest parking spots for all the terminals and we’ll be there waiting for you at your arrivals gate, easily identifiable,
                ensuring smooth, fuss-free and seamless transfers.
            </p>

            <div className={`qns-one-half home-icon-wrapper-2 ${styles.mobile}`}>
                <div className="qns-home-icon">
                    <i className="fa  fa-car"></i>
                </div>
                <div className="home-icon-inner">
                    <h4>Our Fleet </h4>
                    <div className="title-block3">

                    </div>
                    <p>
                        <strong>
                            Churchill Transfers is a true London airport transfer specialist.</strong>
                        <br />
                        Our offices are located a stone’s throw from Heathrow Airport. Picking up passengers from London airports and driving them in to Central London is what we do all day,
                        every day. We know the speediest routes, the handiest parking spots for all the terminals and we’ll be there waiting for you at your arrivals gate, easily identifiable,
                        ensuring smooth, fuss-free and seamless transfers.
                    </p>
                </div>
            </div>


            <div className="owl-carousel1 fleet-block-wrapper">

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/standard-saloon-op-2.webp" alt="Saloon" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">Saloon</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>3 Passengers</li>
                            <li>2 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/estate-op-2.webp" alt="Estate" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">Estate</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>3 Passengers</li>
                            <li>4 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/mpv-op-1.webp" alt="MPV" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">MPV</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>5 Passengers</li>
                            <li>5 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/8-seater-op-1.webp" alt="8 Seater" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">8 Seater</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>8 Passengers</li>
                            <li>8 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/executive_saloon.webp" alt="Saloon VIP" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">Saloon VIP</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>2 Passengers</li>
                            <li>2 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/mpv-vip.webp" alt="MPV VIP" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">MPV VIP</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>5 Passengers</li>
                            <li>8 Suitcases</li>
                        </ul>
                    </div>
                </div>

                <div className="fleet-block">
                    <div className="fleet-block-image">
                        <a href="#"><img src="images/cars/8-seater-vip-op-1.webp" alt="8 Seater VIP" /></a>
                    </div>
                    <div className="fleet-block-content">
                        <div className="fleet-price">8 Seater VIP</div>
                        <div className="title-block3"></div>
                        <ul className="list-style4">
                            <li>8 Passengers</li>
                            <li>8 Suitcases</li>
                        </ul>
                    </div>
                </div>

            </div>

        </section>

    )
}

export default OurFleetHome