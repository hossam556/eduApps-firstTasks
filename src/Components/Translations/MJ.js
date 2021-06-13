import React, { useEffect , useState } from 'react'
import ReactDOM from 'react-dom'
import ToLatex from './ToLatex';

function MJ({ j = "" , lang = null, ...rest}) {

    const[spanId, setSpanId] = useState("mj" + Math.round(Math.random() * 1000000));
    useEffect(() => {
        let init = function (iteration) {
            if (typeof window === 'undefined') {
                setTimeout(function() { init(iteration) }, 500);
                return;
            }
            if (window.MathJax) {
                ReactDOM.render(
                    <span>{ToLatex(j, lang)}</span>,
                    document.getElementById(spanId), () => {
                        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
                    }
                );
                return;
            }
            if (iteration >= 60) return; //timeout 
            setTimeout(function () { init(iteration + 1) }, 500);
        }
        init(0);
    });
    return (
        <span id={spanId} style={{margin: "0 6px", display: "inline-block"}} {...rest}></span>
    )
}
export default MJ;