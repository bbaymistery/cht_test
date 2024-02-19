import Head from "next/head";
import React from "react";
export default function TrackMyTaxi(props) {
  return (
    <React.Fragment>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Track My Taxi</title>
        <style>{`html,body { margin:0;padding:0;overflow:hidden; }`}</style>
      </Head>
      <iframe
        src="https://api.london-tech.com/api/v1/drivers/location?origin=london-heathrow-taxi"
        style={{ width: "100vw", height: "100vh" }}
      ></iframe>
    </React.Fragment>
  );
}

