import React from 'react'
import Breadcrumb from '../../components/elements/Bredcrumb'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import ContactUsContent from './ContactContent'
let keywords = "Churchill Transfers contact tel numbers,churchilltransfers.com"
let title = "Contact Us: 24/7 Tel no:  0203 887 4239 Churchill Transfers"
let description = "Churchill Transfers 24/7 Contact information."
const ContactUs = () => {
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <Breadcrumb title="Contact Us" />
            <ContactUsContent />
        </GlobalLayout>
    )
}

export default ContactUs
