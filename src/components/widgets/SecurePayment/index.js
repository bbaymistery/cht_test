import React from 'react'
import { useWindowSize } from '../../../hooks/useWindowSize';
import styles from "./styles.module.scss"
const SecurePayment = () => {
	//hook
	let size = useWindowSize();
	let { width } = size
	return (
		<section className="clearfix flex">

			{/* <!-- BEGIN .about-us-block --> */}
			<div className={`about-us-block about-us-block-1 ${styles.fixed_width}`}>

				<h3>Secure Payment</h3>
					<div className="title-block4"></div>
					<p style={{maxWidth:'900px',textAlign:'center'}}>Churchill Transfers offers a 24-hour online booking service, giving you the flexibility to book your Gatwick/Heathrow/Luton/Stansted taxi transfer at your own convenience.</p>

				<p style={{ maxWidth: '900px', textAlign: 'center' }}>Our online booking system is fully secure with 128 Bit SSL. We understand the importance of financial security and we respect your privacy. We do not store your credit card information under any circumstances.
					</p>
					<a href="/aboutus" alt="About Us" className="button0">Learn More</a>

				{/* <!-- END .about-us-block --> */}
			</div>

			{/* <div className="video-wrapper video-wrapper-home"> */}

			{/* <!--div className="video-play">
					<a href="https://www.youtube.com/watch?v=Uv5ZRiAreHA" data-gal="prettyPhoto"><i className="fa fa-play"></i></a>
				</div--> */}

			{/* </div> */}

			{/* <!-- END.clearfix-- > */}
		</section >
	)
}

export default SecurePayment