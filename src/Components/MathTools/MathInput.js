import React, { useEffect } from 'react'

function MathInput({id = "mi" + Math.round(Math.random() * 1000000),
                    width = "200px",
                    onChange = (value)=>{}}) {
    useEffect(() => {
        let init = function(id) {
            if (typeof window === 'undefined') {
                setTimeout(function() { init(id) }, 500);
                return;
            }
            if(window.$ === undefined || window.$ === null || window.MQ === undefined || window.MQ === null) {
                setTimeout(function() { init(id) }, 500);
                return;
            }
            let htmlElement = document.getElementById(id);
            let config = {
               handlers: { edit: function(){
                   onChange(window.MIValue(id));
               } },
               restrictMismatchedBrackets: true
             };
            window.MQ.MathField(htmlElement, config);
        }
        init(id);
    })
    return(<div id = {id} 
                style = {{width: width}}
                onFocus = {() => window.lastFocusedMQ = id}>
            </div>)
}
export default MathInput