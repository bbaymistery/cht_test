import React from 'react'
import Breadcrumb from '../../components/elements/Bredcrumb'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import Content_Privacy from './Content_Privacy'
let keywords ="Gatwick airport transfers, Gatwick airport taxi quote, Gatwick airport taxi, Gatwick transfer, taxi to Gatwick airport, Heathrow Airport transfers, Heathrow Airport taxi quote, transfer to Heathrow Airport, private transfer to Heathrow Airport, taxi to Heathrow, Heathrow taxi quote, London airport transfers"
let title ="Churchill Transfers’ Privacy Policy: churchilltransfers.com, London Airport Transfers"
let description ="London airport transfer provider Churchill Transfers values your privacy."
const PrivacyPolicy = () => {
  return (
      <GlobalLayout keywords={keywords} title={title} description={description}>
          <Breadcrumb title="Privacy Policy" about={true}  service={false} />
          <Content_Privacy/>
      </GlobalLayout>
  )
}

export default PrivacyPolicy