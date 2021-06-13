import React, { useEffect } from 'react'

function Translations({showMenu = false, lineBreaking = false, fastPreviews = true}) {
    useEffect(() => {
      function init() {
        if (typeof window === 'undefined') {
          setTimeout(init, 500);
          return;
        }
        let rstudioMJConfig = document.createElement('script');
        rstudioMJConfig.type = "text/javascript";
        rstudioMJConfig.src = "https://mathjax.rstudio.com/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
        document.head.appendChild(rstudioMJConfig);
        let amiriCSS = document.createElement('link');
        amiriCSS.rel = "stylesheet";
        amiriCSS.type = "text/css";
        amiriCSS.href = "https://fonts.googleapis.com/css?family=Amiri";
        document.head.appendChild(amiriCSS);
        let mathjaxScript = document.createElement('script');
        mathjaxScript.type = "text/x-mathjax-config";
        mathjaxScript.text = 
        "MathJax.Ajax.config.path[\"arabic\"] = \"https://cdn.rawgit.com/Edraak/arabic-mathjax/v1.0/dist\";" + 
        "MathJax.Hub.Config({" +
        (lineBreaking == true ? "\"CommonHTML\": { linebreaks: { automatic: true  } }, \"HTML-CSS\": { linebreaks: { automatic: true } }," : "" )+
        (fastPreviews == false ? "\"fast-preview\": { disabled: true }, tex2jax: { preview: \"none\" }," : "" )+ 
        "showMathMenu:" + showMenu +
        ", extensions: [\"[arabic]/arabic.js\"]" + 
        "});";
        document.head.appendChild(mathjaxScript);
      }
      init();
    }, [])
    return(<></>)
  }
  export default Translations;  