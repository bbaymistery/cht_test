import React from 'react'
import Breadcrumb from '../../components/elements/Bredcrumb'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import TermsContent from './TermsContent'
import styles from "./styles.module.scss"
let keywords = "Gatwick airport transfers, Gatwick airport taxi quote, Gatwick airport taxi, Gatwick transfer, taxi to Gatwick airport, Heathrow Airport transfers, Heathrow Airport taxi quote, transfer to Heathrow Airport, private transfer to Heathrow Airport, taxi to Heathrow, Heathrow taxi quote, London airport transfers"
let title = "Churchill Transfers’ Terms and Conditions: churchilltransfers.com, London Airport Transfers"
let description = "London airport transfer provider Churchill Transfers values your privacy."
const Terms = () => {
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <Breadcrumb title="Terms and Conditions" />
            <TermsContent />
        </GlobalLayout>
    )
}

export default Terms

//