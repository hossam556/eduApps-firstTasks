import tnum from '../Translations/tnum'

export default function Grid({ nx = 10, 
                               ny = 10,
                               plotWidth = 500, 
                               plotHeight = 500,
                               linesColor = "#C4C4C4",
                               numxAxis = Array.from({length : ny }, (_, index) => index+1),
                               numyAxis = Array.from({length : nx }, (_, index) => index+1),
                               numFontSize = ["13px", "13px", "13px"]}) {
    const xAxisLines = Array.from({ length: nx + 1 }, (_, index) => index);
    const yAxisLines = Array.from({ length: ny + 1 }, (_, index) => index);
    let width = window.innerWidth;
    const numFontSize_ = width <= 1199 ? numFontSize[2] : (width <= 1799 ? numFontSize[1] : numFontSize[0])
    const numbersVisible = numFontSize_ === "0" ? false:true
    return (
        <>
            <g style={{ stroke: linesColor }}>
                {xAxisLines.map((number) =>
                    <line x1={number === xAxisLines.length - 1 ? 30 : 25}
                        y1={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 30}
                        x2={number === xAxisLines.length - 1 ? plotWidth - 20 : plotWidth - 30}
                        y2={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 30}
                        style={number === xAxisLines.length - 1 ? {stroke: "black"} : {}}
                        key={"x" + number}
                    />
                )}
                {yAxisLines.map((number) =>
                    <line x1={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 30}
                        y1={number === 0 ? 20 : 30}
                        x2={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 30}
                        y2={number === 0 ? plotHeight - 30 : plotHeight - 25}
                        style={number === 0 ? {stroke: "black"} : {}}
                        key={"y" + number}
                    />
                )}
            </g>
            <g style={{ fill: "black", stroke: "black", strokeWidth: 1 }}>
                <polygon points={(plotWidth - 20) + "," + (plotHeight - 25) + " " +
                    (plotWidth - 20) + "," + (plotHeight - 35) + " " +
                    (plotWidth - 15) + "," + (plotHeight - 30)} />
                <polygon points={(25) + "," + (20) + " " +
                    (35) + "," + (20) + " " +
                    (30) + "," + (15)} />
            </g>
            <g style={{ fontSize: "16px", fill: "#0049C5", direction: "ltr" }}>
                <text x={plotWidth - 20} y={plotHeight - 40}>
                    {localStorage.getItem("language") !== 'ar' ? 'x' : 'س'}
                </text>
                <text x={38} y={17}>
                    {localStorage.getItem("language") !== 'ar' ? 'y' : 'ص'}
                </text>
            </g>
            {numbersVisible && <g style={{ direction: "rtl", fontSize: numFontSize_ }}>
                {
                    xAxisLines.map((number) => {
                        if (number === xAxisLines.length-1) return <text key={"x2" + number} />;
                        return(<text x={20} y={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 35}
                            key={"x2" + number}>
                            {tnum(numyAxis[numyAxis.length - number - 1])}
                        </text>)
                    })
                }
                {
                    yAxisLines.map((number) => {
                        if (number === 0) return <text key={"y2" + number} />;
                        return (
                            <text x={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 35} y={plotHeight - 10}
                                key={"y2" + number}>
                                {tnum(numxAxis[number-1])}
                            </text>
                        )
                    })
                }
                <text x={23} y={plotHeight-25}>{tnum(0)}</text>
            </g>}
        </>
    )
} 