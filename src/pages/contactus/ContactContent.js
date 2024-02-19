import React, { useState } from 'react'
import Alert from '../../components/elements/Alert'

const ContactUsContent = () => {


    const [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        name: "",
        email: "",
        message: "",
        subject: "",
        nameError: false,
        emailError: false,
        messageError: false,
        subjectError: false,
        loading: false
    })
    let { name, email, message, subject, loading, nameError, emailError, subjectError, messageError } = internalState

    const [alert, setAlert] = useState({ alert: false, close: false, message: "", warning: false })

    const handleChange = (e) => { setInternalState({ [e.target.name]: e.target.value }) }

    const sendEmail = (e) => {
        e.preventDefault()
        if (!name) {
            setInternalState({ nameError: true })
        }
        if (!email) {
            setInternalState({ emailError: true })
        }
        if (!message) {
            setInternalState({ messageError: true })
        }
        if (!subject) {
            setInternalState({ subjectError: true })
        }

        let formValue = { name, email, message, subject }

        if (email && subject && name && message) {
            setInternalState({ loading: true })
            let reqOptions = { method: "POST", body: JSON.stringify({ formValue }), headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json", }, };
            fetch("/api/contact_us_email", reqOptions)
                .then((res) => {
                    console.log(res);

                    setInternalState({ loading: false })
                    if (res.statusText === "OK") {
                        setAlert({ alert: true, close: true, message: "Email successfully sended", });
                    } else {
                        setAlert({ alert: true, close: true, error: true, message: "Something went wrong ", });
                    }

                    setInternalState({ email: "", message: "", name: "", subject: "", messageError: false, subjectError: false, emailError: false, })
                })
                .catch((e) => console.log(e));
        }
    }

    return (
        <div className="content-wrapper-outer clearfix">
            {/* <!-- BEGIN .main-content --> */}
            {alert.alert ? (
                <Alert setAlert={setAlert} alert={alert} message={alert.message} close={alert.close} error={alert.error} warning={alert.warning} />) : <React.Fragment></React.Fragment>
            }
            <div className="main-content main-content-full">

                {/* <!-- BEGIN .clearfix --> */}
                <div className="clearfix">

                    {/* <!-- BEGIN .qns-one-half --> */}
                    <div className="qns-one-half">

                        {/* <!-- BEGIN .contact-form-1 --> */}
                        <form className="contact-form-1" >

                            <label>Name <span>* {nameError ? "required" : ""} </span></label>
                            <input onChange={handleChange} type="text" name="name" className={nameError ? "border_error" : ""} value={name} />

                            <label>Email <span>* {emailError ? "required" : ""}</span></label>
                            <input onChange={handleChange} type="text" name="email" className={emailError ? "border_error" : ""} value={email} />

                            <label>Subject <span>* {subjectError ? "required" : ""}</span></label>
                            <input onChange={handleChange} type="text" value={subject} name="subject" className={subjectError ? "border_error" : ""} />

                            <label>Message <span>* {messageError ? "required" : ""}</span></label>
                            <textarea onChange={handleChange} cols="10" rows="9" name="message" value={message} className={messageError ? "border_error" : ""}></textarea>

                            <button onClick={(e) => sendEmail(e)}>
                                {loading ? "Loading" : "Send"}   <i className="fa fa-envelope"></i>
                            </button>

                            {/* <!-- END .contact-form-1 --> */}
                        </form>

                        {/* <!-- END .qns-one-half --> */}
                    </div>

                    {/* <!-- BEGIN .qns-one-half --> */}
                    <div className="qns-one-half qns-last">
                        <h4>Contact Details</h4>
                        <div className="title-block7"></div>

                        <ul className="contact-details-list">
                            <li className="cdw-address">Jolyon House, Office 202B, Amberly Way Hounslow, TW4 6BH, United Kingdom</li>
                            <li className="cdw-phone clearfix">
                                0203 887 4239
                                <span>
                                    (+44 203 887 4239 if dialling from outside the UK)
                                </span>
                            </li>
                            <li className="cdw-email clearfix">
                                <a href="mailto: info@churchilltransfers.com" className="__cf_email__" data-cfemail="177e79717857747f6265747f7e7b7b6365767964717265643974787a">
                                    info@churchilltransfers.com
                                </a>
                            </li>

                        </ul>

                        {/* <h4>Social Media</h4>
                        <div className="title-block7"></div>
                        <ul className="social-links clearfix">
                            <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-pinterest"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-youtube-play"></i></a></li>
                        </ul> */}

                        {/* <!-- END .qns-one-half --> */}
                    </div>

                    {/* <!-- END .clearfix --> */}
                </div>

                <hr className="space3" />

                {/* <!-- BEGIN #google-map --> */}
                {/* <div id="google-map" style={{ height: "385px", margin: "0px 0px 70px 0px" }}></div>

                <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">
                </script> */}


                {/* <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                     function initialize() {

                          var myLatlng = new google.maps.LatLng(51.4625842, -0.3974922);

                          var styles = [
                              {
                                  stylers: [
                                      { hue: "#e8848e" },
                                      { saturation: -50 }
                                  ]
                              }, {
                                  featureType: "road",
                                  elementType: "geometry",
                                  stylers: [
                                      { lightness: 100 },
                                      { visibility: "simplified" }
                                  ]
                              }, {
                                  featureType: "road",
                                  elementType: "labels",
                                  stylers: [
                                      { visibility: "off" }
                                  ]
                              }
                          ];

                          var mapOptions = {
                              mapTypeControlOptions: {
                                  mapTypeIds: ['Styled']
                              },
                              center: myLatlng,
                              zoom: 14,
                              mapTypeId: 'Styled',
                              scrollwheel: false,
                              scaleControl: false,
                              disableDefaultUI: false
                          };

                          var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
                          var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
                          map.mapTypes.set('Styled', styledMapType);

                          // Set Map Marker
                          var contentString = 'Churchill Transfers Head Office';
                          var infowindow = new google.maps.InfoWindow({
                              content: contentString
                          });
                          var marker = new google.maps.Marker({
                              position: myLatlng,
                              map: map,
                              title: 'Map Marker 1',
                              icon: {
                                  path: fontawesome.markers.MAP_MARKER,
                                  scale: 0.8,
                                  strokeWeight: 0,
                                  strokeColor: 'black',
                                  strokeOpacity: 1,
                                  fillColor: '#cc4452',
                                  fillOpacity: 1,
                              },
                          });

                          google.maps.event.addListener(marker, 'click', function () {
                              infowindow.open(map, marker);
                          });
                        }
                   google.maps.event.addDomListener(window, 'load', initialize);
                  `}}>
                </script>
 */}

                {/* <hr className="space3" /> */}

                {/* <!-- END .main-content --> */}
            </div>

            {/* <!-- END .content-wrapper-outer --> */}
        </div>
    )
}

export default ContactUsContent



