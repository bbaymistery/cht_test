import React from 'react'
import CityLondonInfo from './CityLondonInfo';
import CityLondon_Services from './CityLondon_Services';
const CityLondonContent = ({ populationDestinations }) => {
  return (
      <div className="content-wrapper-outer clearfix">
          <div className="main-content main-content-full">
              <div className="mobile-rate-table-msg msg default"><p>Mobile users, please swipe left/right to view prices</p></div>
              <CityLondon_Services populationDestinations={populationDestinations}/>
              <div className="call-to-action-small clearfix">
                  <h4>Place your booking online today with ease and enjoy your next trip in luxury</h4>
                  <a href="tel:+442038874239" className="call-to-action-button">Online Booking</a>
              </div>
              <CityLondonInfo/>
              &nbsp;
          </div>
      </div>
  )
}

export default CityLondonContent