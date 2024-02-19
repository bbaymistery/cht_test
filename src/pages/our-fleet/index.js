import React from 'react'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import Breadcrumb from '../../components/elements/Bredcrumb'
import OurFleetContent from './OurFleetContent'
//
let keywords = ""
let title = "Chauffeur - APL - Our Fleet"
let description = ""

const OurFleet = () => {
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <Breadcrumb title="Our Fleet" />
            <OurFleetContent/>
        </GlobalLayout>
    )
}

export default OurFleet