import React from 'react'
import env from '../../resources/env'

const ContentSiteMap = () => {
  return (
      <div className="content-wrapper-outer clearfix">

          {/* <!-- BEGIN .main-content --> */}
          <div className="main-content main-content-full">

              {/* <!-- BEGIN .clearfix --> */}
              <div className="clearfix">

                  {/* <!-- BEGIN .qns-one-half --> */}
                  <div className="qns-one">

                      <ul className="level-0">

                          <li className="lpage"><a href="/" title="Churchill Transfers Home">Churchill Transfers Home</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}`} title="Booking">Booking </a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/our-fleet`} title="Our Fleet"> Our Fleet</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/heathrow-to-london`} title="Heathrow Airport to Central London Transfers">Heathrow Airport to Central London Transfers</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/gatwick-to-london`} title="Gatwick Airport to Central London Transfers">Gatwick Airport to Central London Transfers</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/stansted-to-london`} title="Stansted Airport to Central London Transfers">Stansted Airport to Central London Transfers</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/city-to-london`} title="London City Airport to Central London Transfers">London City Airport to Central London Transfers</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/luton-to-london`} title="Luton Airport to Central London Transfers">Luton Airport to Central London Transfers</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/aboutus`} title="About Us">About Us</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/terms`} title="Terms and Conditions"> Terms and Conditions</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/contactus`} title="Contact Us">Contact Us</a></li>
                          <li className="lpage"><a href={`${env.websiteDomain}/privacy-policy`} title="Privacy Policy">Privacy Policy </a></li>
                      </ul>

                      {/* <!-- END .qns-one-half --> */}
                  </div>

                  {/* <!-- END .clearfix --> */}
              </div>

              <hr className="space3" />

              {/* <!-- END .main-content --> */}
          </div>

          {/* <!-- END .content-wrapper-outer --> */}
      </div>

  )
}

export default ContentSiteMap