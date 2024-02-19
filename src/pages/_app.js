import "../styles/global.scss";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import env from '../resources/env'
function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window === 'object') {
      window.handelErrorLogs = (error = {}, location = '', logs = {}) => {
        let raw = {};
        try {
          let { name, message, stack } = typeof error === 'string' ? new Error(error) : error;
          raw = { "error": { name, message, stack }, "location": location, "logs": logs };
        } catch (e) {
          raw = { "error": { ...e, ...error }, "location": location, "logs": logs };
        }

        let requestOptions = {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(raw),
          redirect: 'follow'
        };


        if (!env.websiteDomain.includes("localhost")) {
          try {
            fetch(`${env.apiDomain}/tools/add-error-logs`, requestOptions)
              .then(response => response.text())
              .then(result => { console.log(result)  })
              .catch(error => console.log('error', error));
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }, [])


  //it comes from index js serVerSide props
  let { paymentTypes, appData } = pageProps


  useEffect(() => {
    // Getting app data cartypes ..ext and save on store
    dispatch({ type: "GET_APP_DATA", data: { paymentTypes, appData } })
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);


