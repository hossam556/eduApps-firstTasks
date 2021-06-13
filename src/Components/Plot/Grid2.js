import tnum from '../Translations/tnum'

export default function Grid2({ nx = 10,
                                ny = 10,
                                plotWidth = 500,
                                plotHeight = 275,
                                linesColor = "#C4C4C4",
                                numxAxis = Array.from({length : ny }, (_, index) => index+1),
                                numyAxis = Array.from({length : nx }, (_, index) => index+1),
                                numFontSize = ["13px", "13px", "13px"] }) {
    const xAxisLines = Array.from({ length: nx + 1 }, (_, index) => index);
    const yAxisLines = Array.from({ length: ny * 2 + 1 }, (_, index) => index);
    let width = window.innerWidth;
    const numFontSize_ = width <= 1199 ? numFontSize[2] : (width <= 1799 ? numFontSize[1] : numFontSize[0])
    const numbersVisible = numFontSize_ === "0" ? false:true
    return (
        <>
            <g style={{ stroke: linesColor }}>
                {xAxisLines.map((number) =>
                    <line x1={number === nx ? 15:30}
                        y1={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 30}
                        x2={number === nx ? plotWidth - 15:plotWidth - 30}
                        y2={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 30}
                        style={number === nx ? { stroke: "black" } : {}}
                        key={"x" + number}
                    />
                )}
                {yAxisLines.map((number) =>
                    <line x1={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 30}
                        y1={number === ny ? 15:30}
                        x2={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 30}
                        y2={plotHeight - 30}
                        style={number === ny ? { stroke: "black" } : {}}
                        key={"y" + number}
                    />
                )}
            </g>
            <g style={{ fill: "black", stroke: "black", strokeWidth: 1 }}>
                <polygon points={(15) + "," + (plotHeight - 35) + " " +
                    (15) + "," + (plotHeight - 25) + " " +
                    (10) + "," + (plotHeight - 30)} />
                <polygon points={(plotWidth - 15) + "," + (plotHeight - 35) + " " +
                    (plotWidth - 15) + "," + (plotHeight - 25) + " " +
                    (plotWidth - 10) + "," + (plotHeight - 30)} />
                <polygon points={(plotWidth / 2 - 5) + "," + (15) + " " +
                    (plotWidth / 2 + 5) + "," + (15) + " " +
                    (plotWidth / 2) + "," + (10)} />
            </g>
            <g style={{ fontSize: "16px", fill: "#0049C5", direction: "ltr" }}>
                <text x={plotWidth - 20} y={plotHeight - 40}>
                    {localStorage.getItem("language") !== 'ar' ? 'x' : 'س'}
                </text>
                <text x={0} y={plotHeight - 40}>
                    {localStorage.getItem("language") !== 'ar' ? 'x′' : '′س'}
                </text>
                <text x={plotWidth / 2 + 8} y={17}>
                    {localStorage.getItem("language") !== 'ar' ? 'y' : 'ص'}
                </text>
            </g>
            {numbersVisible && <g style={{direction: "rtl", fontSize: numFontSize_ }}>
                {
                    xAxisLines.map((number) => {
                        let num = parseInt(number);
                        let nxx = parseInt(nx)
                        let finalNum;
                        if (num === nxx) finalNum = ""
                        else finalNum = tnum(numyAxis[nxx - num - 1])
                        return (
                            <text x={plotWidth/2 - 6} y={number * ((plotHeight - 60) / (xAxisLines.length - 1)) + 32}
                                key={"x2" + number}>
                                    {finalNum}
                            </text>
                        )
                    })
                }
                {
                    yAxisLines.map((number) => {
                        let num = parseInt(number);
                        let nyy = parseInt(ny)
                        let finalNum;
                        if(num === nyy)finalNum = ""
                        else if(num > nyy) finalNum = tnum(numxAxis[num - nyy - 1])
                        else if(localStorage.getItem("language") !== 'ar' && numxAxis[nyy - num - 1] !== "") finalNum = tnum(numxAxis[nyy - num - 1]) + "-"
                        else if(numxAxis[nyy - num - 1]) finalNum = "-" + tnum(numxAxis[nyy - num - 1])
                        else finalNum = ""
                        return (
                            <text x={number * ((plotWidth - 60) / (yAxisLines.length - 1)) + 35} y={plotHeight - 15}
                                key={"x2" + number}>
                                    {finalNum}
                            </text>
                        )
                    })
                }
                <text x={plotWidth / 2 + 4} y={plotHeight - 15}>{tnum(0)}</text>
            </g>}
        </>
    )
} 