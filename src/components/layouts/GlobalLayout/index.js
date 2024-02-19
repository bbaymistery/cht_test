import TopHeader from '../../widgets/TopHeader';
import React from 'react'
import Head from 'next/head';
import Footer from '../../widgets/Footer';


const GlobalLayout = (
  { children,
    title = "Churchill Transfers: London Airport Transfers -churchilltransfers.com",
    description = "Churchill Transfers is a leading airport transfer specialist, offering cheap London airport transfers - serving all major airports. Book your Gatwick or Heathrow transfer online today.",
    keywords = "London airport transfers, Heathrow transfers, Gatwick transfers, Stansted transfers, Luton transfers, Heathrow airport transfers, Gatwick airport transfers, cheap London airport transfers." }
) => {
  return (
    <>
      <Head>
        {/* <!-- Title --> */}
        <title>{title}</title>
        {/* <meta name="robots" content="index,follow" /> */}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        {/* <!--Meta Tags--> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 " />
        <link rel="icon" href="/favicon.ico" />

        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </Head>
      <TopHeader />


      <main>{children}</main>
      <Footer />
    </>
  )
}

export default GlobalLayout
