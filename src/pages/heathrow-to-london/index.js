import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Breadcrumb from '../../components/elements/Bredcrumb'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import env from '../../resources/env'
import HethrowContent from './HethrowContent'
let keywords = "Taxi from Heathrow airport to London, London Heathrow airport transfers, Heathrow airport to London taxi transfer, Heathrow airport to London taxi quote, Heathrow airport taxi, Heathrow London transfer, Heathrow London Taxi, cheap Heathrow Central London transfers."
let title = "Heathrow Airport to Central London Transfers: Churchilltransfers.com"
let description = "Churchill Transfers is a leading provider of cheap Heathrow Airport – Central London transfers."
const HethrowToLondon = (props) => {
    const dispatch = useDispatch()
    let { appData, populationDestinations, paymentTypes, fromarticles } = props

    if (fromarticles) {
        populationDestinations = props.props.populationDestinations
        appData = props.props.appData
        paymentTypes = props.props.paymentTypes
    }

    useEffect(() => {
        // Getting app data cartypes ..ext and save on store
        dispatch({ type: "GET_APP_DATA", data: { paymentTypes, appData } })

    }, [])
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <Breadcrumb title="Heathrow to London" service={true} />
            {populationDestinations ? <HethrowContent populationDestinations={populationDestinations} /> : <React.Fragment></React.Fragment>}
        </GlobalLayout>
    )
}

export default HethrowToLondon

export async function getServerSideProps() {
    const appDataUrl = `${env.apiDomain}/app/en`;
    const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;
    const populationDestinationUrl = `${env.apiDomain}/api/v1/quotation/popular-destinations`
    const urls = [appDataUrl, populationDestinationUrl, paymentUrl]

    let response = await Promise.all(urls.map(async url => {
        let resp = await fetch(url);
        return resp.json();
    }));

    return {
        props: {
            appData: response[0],
            populationDestinations: response[1].data,
            paymentTypes: response[2].data,
        },
    };
}

