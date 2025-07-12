import { f7 } from "framework7-react";
import { useEffect, useRef } from "react";
import '../css/InfoMessage.css'

function InfoMessage ({message}) {
    const infoToast = useRef(null);
    useEffect(() =>{
        if (!infoToast.current) {
            infoToast.current = f7.toast.create({
                text: message,
                position: 'top',
                closeTimeout: 2000,
                cssClass: 'InfoMessage'
            })
        } else {
            infoToast.current.params.text = message;
        }
        infoToast.current.open();
    }, [message])

}

export {InfoMessage};