import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";


export function useConfirm(params = {}) {
    let { previousUrl, nextUrl, messsage = "If you leave the page, all data will be deleted.",  } = params
    const [confMessage, setConfMessage] = useState(messsage);

    const router = useRouter()

    useEffect(() => {
        const beforeUnloadHandler = (e) => {
            if (confMessage) {
                (e || window.event).returnValue = confMessage;
                return confMessage;
            }
        };
        //burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
        const beforeRouteHandler = (url) => {
            //eger resevation documente geldi ve geri paymente gitmek isterse onda direk uayri mesaji gelsin ve home page gitsin
            //this case is all about when we are in reservationDocument page   =>previousUrl === '/' && nextUrl === '/'
            if (previousUrl === '/' && nextUrl === '/') {
                router.reload()
            } else {
                //we can go back or step forward
                if (url === nextUrl || url === previousUrl) {
                    setConfMessage("")
                    return
                } else {
                    setConfMessage(messsage)
                }
            }
            if (Router.pathname !== url && !confirm(confMessage)) {
                Router.events.emit("routeChangeError");
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            }
        };

        window.addEventListener("beforeunload", beforeUnloadHandler);
        Router.events.on("routeChangeStart", beforeRouteHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, []);


    return confMessage
}