/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/heathrow-to-london.html",
        destination: "/heathrow-to-london",
        permanent: true,
      },
      {
        source: "/gatwick-to-london.html",
        destination: "/gatwick-to-london",
        permanent: true,
      },
      {
        source: "/contact-us.html",
        destination: "/contactus",
        permanent: true,
      },

      //
      {
        source: "/our-fleet.html",
        destination: "/our-fleet",
        permanent: true,
      },
      {
        source: "/sitemap.html",
        destination: "/sitemap",
        permanent: true,
      },
      {
        source: "/about-us.html",
        destination: "/aboutus",
        permanent: true,
      },
      {
        source: "/city-to-london.html",
        destination: "/city-to-london",
        permanent: true,
      },
      {
        //!
        source: "/stansted-to-london.html",
        destination: "/stansted-to-london",
        permanent: true,
      },
      {
        source: "/luton-to-london.html",
        destination: "/luton-to-london",
        permanent: true,
      },
      {
        //!
        source: "/privacy-policy.html",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/booking.html",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
