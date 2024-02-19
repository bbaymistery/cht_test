import React from 'react'
import Breadcrumb from '../../components/elements/Bredcrumb'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import AboutContent from './AboutContent'
let keywords = "London airport transfers, Heathrow transfers, Gatwick transfers, Stansted transfers, Luton transfers, London City Transfers, Heathrow airport transfers, Gatwick airport transfers, cheap London airport transfers, London airport taxi."
let title = "About Us - Churchill Transfers: London Airport Transfers - churchilltransfers.com"
let description = "About Us - Churchill Transfers is a licensed taxi company offering cheap transfers to London Heathrow and all other London airports."

const AboutUs = () => {
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <Breadcrumb title="About Us" />
            <AboutContent/>
        </GlobalLayout>
    )
}
export default AboutUs

