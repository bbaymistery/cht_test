import React, { Component } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
const TopHeader = () => {
  let router = useRouter();

  const toggleMenu = (e) => {
    // let menuburger = document.querySelector("#mobile-navigation-btn")
    // let wrapper = document.querySelector(".mobile-navigation-wrapper")
    // $("#mobile-navigation-btn").on('click', function () {
    $(".mobile-navigation-wrapper").slideToggle("slow", function () {
      // Animation complete.
    });
    // });

  }
  return (
    // < !--BEGIN.header - area - 1 -- >
    <div className="header-area-1">

      {/* <!-- BEGIN .top-bar-wrapper --> */}
      <div className="top-bar-wrapper">

        {/* <!-- END .top-bar-wrapper --> */}
      </div>

      {/* <!-- BEGIN .header-content --> */}
      <div className="header-content">

        {/* <!-- BEGIN .logo --> */}
        <a href="/">

          <div className="logo">
            <h2><a href="/" title="Churchill Transfers">Churchill Transfers</a></h2>
            {/* <!-- END .logo --> */}
          </div>
        </a>

        {/* <!-- BEGIN .header-icons-wrapper --> */}
        <div className="header-icons-wrapper clearfix">
          <a href="tel:+442038874239" className="topright-button"><span>+44 203 887 42 39</span></a>
          {/* <!-- BEGIN .header-icons-inner --> */}
          <div className="header-icons-inner clearfix">

            {/* <!-- BEGIN .header-icon --> */}
            <div className="header-icon">
              <p><i className="fa fa-check-square-o" aria-hidden="true"></i><strong>Airport Transfers</strong></p>
              <p className="header-icon-text">Offered At Short Notice</p>
              {/* <!-- END .header-icon --> */}
            </div>

            {/* <!-- BEGIN .header-icon --> */}
            <div className="header-icon">
              <p><i className="fa fa-check-square-o" aria-hidden="true"></i><strong>Cruise Transfers</strong></p>
              <p className="header-icon-text">Can Be Easily Arranged</p>
              {/* <!-- END .header-icon --> */}
            </div>

            {/* <!-- BEGIN .header-icon --> */}
            <div className="header-icon">
              <p><i className="fa fa-check-square-o" aria-hidden="true"></i><strong>Business Transfers</strong></p>
              <p className="header-icon-text">You Will Arrive On Time</p>
              {/* <!-- END .header-icon --> */}
            </div>

            {/* <!-- END .header-icons-inner --> */}
          </div>

          {/* <!-- END .header-icons-wrapper --> */}
        </div>

        <div id="mobile-navigation" >
          <a href="#" id="mobile-navigation-btn" onClick={(e) => toggleMenu(e)}><i className="fa fa-bars"></i></a>
        </div>

        <div className="clearboth"></div>

        {/* <!-- BEGIN .mobile-navigation-wrapper --> */}
        <div className="mobile-navigation-wrapper" >

          <ul>
            <li className={router.pathname === '/' ? 'current-menu-item current_page_item' : ''}><a href="/" title="Churchill Transfers">Home</a></li>
            <li className={router.pathname === '/our-fleet' ? 'current-menu-item current_page_item' : ''}><a href="/our-fleet" title="Our Fleet">Our Fleet</a></li>
            <li className="menu-item-has-children">
              <a href="#" title="Service Rates">Service Rates</a>
              <ul>
                <li className={router.pathname === '/heathrow-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/heathrow-to-london" title="Heathrow to London Transfers">Heathrow to London</Link></li>
                <li className={router.pathname === '/gatwick-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/gatwick-to-london" title="Gatwick to London Transfers">Gatwick to London</Link></li>
                <li className={router.pathname === '/stansted-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/stansted-to-london" title="Stansted to London Transfers">Stansted to London</Link></li>
                <li className={router.pathname === '/city-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/city-to-london" title="City Airport to London Transfers">City To London</Link></li>
                <li className={router.pathname === '/luton-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/luton-to-london" title="Luton Airport to London Transfers">Luton To London</Link></li>
              </ul>
            </li>
            {/* <li>
              <a href="https://churchilltransfers.q-taxi.co.uk/churchilltransfers/" title="Churchill Transfers Agency Login" target="_blank">Agency Login</a>
            </li> */}
            <li>
              <a href="/manage-booking.html" title="Manage Bookings" target="_blank">Manage Bookings</a>
            </li>

            <li className={router.pathname === '/aboutus' ? 'current-menu-item current_page_item' : ''}><a href="/aboutus" title="About Us">About Us</a></li>
            <li className={router.pathname === '/contactus' ? 'current-menu-item current_page_item' : ''}><a href="/contactus" title="Contact Us">Contact Us</a></li>
            <li className={router.pathname === '/terms' ? 'current-menu-item current_page_item' : ''}><a href="/terms" title="Terms and Conditions">Terms and Conditions</a></li>
          </ul>

          {/* <!-- END .mobile-navigation-wrapper --> */}
        </div>

        {/* <!-- END .header-content --> */}
      </div>

      {/* <!-- BEGIN #primary-navigation --> */}
      <nav id="primary-navigation" className="navigation-wrapper fixed-navigation clearfix">

        {/* <!-- BEGIN .navigation-inner --> */}
        <div className="navigation-inner">

          {/* <!-- BEGIN .navigation --> */}
          <div className="navigation">

            <ul>
              <li className={router.pathname === '/' ? 'current-menu-item current_page_item' : ''}><a href="/" title="Churchill Transfers">Home</a></li>
              <li className={router.pathname === '/our-fleet' ? 'current-menu-item current_page_item' : ''}><a href="/our-fleet" title="Our Fleet">Our Fleet</a></li>

              <li className="menu-item-has-children">
                <a href="#" title="Service Rates">Service Rates</a>
                <ul>
                  <li className={router.pathname === '/heathrow-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/heathrow-to-london" title="Heathrow to London Transfers">Heathrow to London</Link></li>
                  <li className={router.pathname === '/gatwick-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/gatwick-to-london" title="Gatwick to London Transfers">Gatwick to London</Link></li>
                  <li className={router.pathname === '/stansted-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/stansted-to-london" title="Stansted to London Transfers">Stansted to London</Link></li>
                  <li className={router.pathname === '/city-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/city-to-london" title="City Airport to London Transfers">City To London</Link></li>
                  <li className={router.pathname === '/luton-to-london' ? 'current-menu-item current_page_item' : ''}><Link href="/luton-to-london" title="Luton Airport to London Transfers">Luton To London</Link></li>
                </ul>
              </li>
              {/* <li >
                <a href="https://churchilltransfers.q-taxi.co.uk/churchilltransfers/" title="Churchill Transfers Agency Login" target="_blank">Agency Login</a>
              </li> */}
              <li>
                <a href="/manage-booking.html" title="Manage Bookings" target="_blank">Manage Bookings</a>
              </li>

              <li className={router.pathname === '/aboutus' ? 'current-menu-item current_page_item' : ''}><a href="/aboutus" title="About Us">About Us</a></li>
              <li className={router.pathname === '/contactus' ? 'current-menu-item current_page_item' : ''}><a href="/contactus" title="Contact Us">Contact Us</a></li>
              <li className={router.pathname === '/terms' ? 'current-menu-item current_page_item' : ''}><a href="/terms" title="Terms and Conditions">Terms and Conditions</a></li>
            </ul>

            {/* <!-- END .navigation --> */}
          </div>

          {/* <!-- END .navigation-inner --> */}
        </div>

        {/* <!-- END #primary-navigation --> */}
      </nav>

      {/* <!-- END .header-area-1 --> */}
    </div>
  )
}

export default TopHeader;
