import tnum from '../Translations/tnum'

export default function NumberLine({x1 = "0",
                                    y1 = "30",
                                    x2 = "500",
                                    y2 = "30",
                                    lineStyle = {stroke: "black", strokeWidth: 1},
                                    arrows = true,
                                    arrowStyle = {fill: "black", stroke: "none"},
                                    ticks = true,
                                    tickStyle = {stroke: "black", strokeWidth: 1},
                                    numbers = Array.from({length : 11}, (_, index) => index-5),
                                    numberStyle = {color: "black", fontSize: "15px"}}) {
  let x1Number = parseInt(x1)
  let y1Number = parseInt(y1)
  let x2Number = parseInt(x2)
  let y2Number = parseInt(y2)
  return(
      <>
        <line x1={x1} y1 ={y1} x2={x2} y2={y2} style={lineStyle}/>
        {arrows === true &&
         <g style={arrowStyle}>
             <polygon points={`${x1},${y1+5} ${x1},${y1-5} ${x1-5},${y1}`}/>
             <polygon points={`${x2},${y2+5} ${x2},${y2-5} ${x2+5},${y2}`}/>
         </g>
        }
        {numbers.map((number, index) => {
            return(
            <foreignObject key={index}
                           x={x1Number + ((x2Number-x1Number)/(numbers.length+1)) * (index+1) - 25} 
                           y={y1Number+15} 
                           style={numberStyle}
                           width="50"
                           height="25">
                <span style={numberStyle}>{tnum(number)}</span>
            </foreignObject>)
        })}
        {ticks === true &&
         numbers.map((number, index) => {
            return(<line key ={index} 
                         x1={x1Number + ((x2Number-x1Number)/(numbers.length+1)) * (index+1)} 
                         y1={y1-4} 
                         x2={x1Number + ((x2Number-x1Number)/(numbers.length+1)) * (index+1)}
                         y2={y1+4} 
                         style={tickStyle}>
            </line>)
        })
        }
      </>
  )
}