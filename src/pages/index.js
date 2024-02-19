import GlobalLayout from "../components/layouts/GlobalLayout";
import Features from "../components/widgets/Features";
import Hero from "../components/widgets/Hero";
import MeetYourNeeds from "../components/widgets/MeetYourNeeds";
import SecurePayment from "../components/widgets/SecurePayment";
import TestimonialLabel from "../components/widgets/TestimonialLabel";
import env from "../resources/env";

export default function Home() {
  return (
    <GlobalLayout>
      <Hero />
      <MeetYourNeeds />
      <Features />
      <SecurePayment />
      <TestimonialLabel />
    </GlobalLayout>
  )
}
export async function getServerSideProps() {
  const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;
  const appDataUrl = `${env.apiDomain}/app/en`;
  const urls = [paymentUrl, appDataUrl]

  let response = await Promise.all(urls.map(async url => {
    let resp = await fetch(url);
    return resp.json();
  }));


  return {
    props: { appData: response[1], paymentTypes: response[0].data, },
  };
}


/*
export async function getServerSideProps() {
  const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;
  const appDataUrl = `${env.apiDomain}/app/en`;
  const populationDestinationUrl = `${env.apiDomain}/api/v1/quotation/popular-destinations`
  const urls = [paymentUrl, appDataUrl, populationDestinationUrl]

  let response = await Promise.all(urls.map(async url => {
    let resp = await fetch(url);
    return resp.json();
  }));


  return {
    props: {
      appData: response[1],
      paymentTypes: response[0].data,
      populationDestinations: response[2].data
    },
  };
}

*/