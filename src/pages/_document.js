import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import env from '../resources/env';

class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        let pageProps = null;
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => {
                    pageProps = props.pageProps;

                    return <App {...props} />
                },
                enhanceComponent: (Component) => Component,
            })
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, pageProps }
    }

    render() {
        return (
            <Html>
                <Head >

                    {/* <!-- JavaScript (must go in header) --> */}
                    {/* <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&key=AIzaSyC7pvFTGjAEDsddy5dgzBJF8RMcJo2heHU"></script> */}
                    <script type="text/javascript" src={`${env.websiteDomain}/js/fontawesome-markers.min.js`}></script>

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-159174709-1"></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-159174709-1');
                  `}}></script>



                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QGR39DQF0X">
                    </script>

                    <script dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-QGR39DQF0X');
                  `}}></script>



                    {/* <!-- Stylesheets --> */}
                    <link rel="stylesheet" href={`${env.websiteDomain}/css/style.css?v2c`} type="text/css" media="all" />
                    <link rel="stylesheet" href={`${env.websiteDomain}/css/color-blue.css`} type="text/css" media="all" />
                    <link rel="stylesheet" href={`${env.websiteDomain}/css/responsive.css`} type="text/css" media="all" />
                    <link href={`${env.websiteDomain}/css/font-awesome.css`} rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/rs-plugin/css/settings.css`} />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/rs-plugin/css/layers.css`} />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/rs-plugin/css/navigation.css`} />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/css/owl.carousel.css`} />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/css/prettyPhoto.css`} />
                    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,200italic,300,300italic,400italic,600,600italic,700,700italic,900,900italic' rel='stylesheet' type='text/css' />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href={`${env.websiteDomain}/css/booking.css`} />

                    {/* <!-- Favicon --> */}
                    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
                    {/* <!-- END head --> */}

                    {/* font awesome */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" media="all" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <!-- JavaScript --> */}
                    {/* <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script> */}
                    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
                    <script src="//cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)"></script>
                    <script src="//unpkg.com/axios/dist/axios.min.js"></script>
                    <script src="//unpkg.com/babel-standalone@6/babel.min.js"></script>

                    <script type="text/javascript" src={`${env.websiteDomain}/js/plugins.js?rev=1.1`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/helpers.js?rev=1.0`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/jquery-migrate-1.4.1.min.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/jquery.themepunch.tools.min.js?rev=5.0`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/jquery.themepunch.revolution.min.js?rev=5.0`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/owl.carousel.min.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/jquery.prettyPhoto.js`}></script>

                    {/* <!-- Only required for local server --> */}
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/extensions/revolution.extension.video.min.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/extensions/revolution.extension.slideanims.min.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/extensions/revolution.extension.layeranimation.min.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/rs-plugin/js/extensions/revolution.extension.navigation.min.js`}></script>
                    {/* <!-- Only required for local server --> */}
                    <script type="text/javascript" src={`${env.websiteDomain}/js/scripts.js?rev=1.2`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/jquery.disableAutoFill.js`}></script>
                    <script type="text/javascript" src={`${env.websiteDomain}/js/home.js?rev=1.7`}></script>
                    {/* <script type="text/javascript" src={`${env.websiteDomain}/js/scripts.js?1`}></script> */}
                </body>

            </Html>
        )
    }
}

export default CustomDocument;