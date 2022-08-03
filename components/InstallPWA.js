import React, { useEffect, useState } from "react";


const InstallPWA = (props) => {
    const { sytleClass, message } = props
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const [viewButton, setViewButton] = useState(true);
    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
        setViewButton(false)
    };
    if (!supportsPWA) {
        return null;
    }
    return (
        <>
            {viewButton ? <button
                className={sytleClass || "btn btn-outline btn-primary"}
                onClick={onClick}
            >
                {message || "Installer l'application"}
            </button> : <></>}
        </>
    );

};

export default InstallPWA;