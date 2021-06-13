import React, { useEffect } from "react";

function MathResources({resourcesUrl = "github"}) {

    useEffect(() => {
        function init() {
            if (typeof window === 'undefined') {
                setTimeout(init, 500);
                return;
            }
            if (window.$ === undefined || window.$ === null) {
                setTimeout(init, 500);
                return;
            }
            let language = localStorage.getItem("language") == undefined ? "en" : localStorage.getItem("language");
            let resUrl = (resourcesUrl == "github" ? "https://kareemmohamed95.github.io/" : "https://www.eduapplications.org/") + "react/math-assets"
            let mathquillcss = document.createElement('link');
            mathquillcss.rel = "stylesheet"
            mathquillcss.type = "text/css"
            mathquillcss.href = resUrl+"/mathquill/"+language+"/mathquill.css";
            document.head.appendChild(mathquillcss);
            let mathquill = document.createElement('script');
            mathquill.src = resUrl+"/mathquill/"+language+"/mathquill.js";
            document.head.append(mathquill);
            let opencpuScript = document.createElement('script');
            opencpuScript.src = "https://cdn.opencpu.org/opencpu-0.4.js";
            document.head.appendChild(opencpuScript);
        }
        init()
    }, [])
    return (<></>)
}
export default MathResources;