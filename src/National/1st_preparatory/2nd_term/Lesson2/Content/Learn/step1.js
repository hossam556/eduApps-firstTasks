import React , { useContext , useState} from 'react'
import Language from '../../Translations/LanguageContext'
import Plot from 'Components/Plot/Plot'
import red from '../../images/red.jpg'
import {SelectInputLatex} from '@gazzar97/widgets'

const Step1 = () => {
  const Lang = useContext(Language);
  const [plot, setPlot] = useState(new Plot([500,500], [400,400], [250,250]));
  const [selected , setselected] =useState('');
  const [data ,setdata] = useState([
      {id:'' , value :''},
      {id:1 , value :'triangle'},
      {id:2 , value :'square'},
      {id:3 , value :'circle'},
      {id:4 , value :'rhombus'}])


  return(
    <div className = "row flex-center wrapflex text-out" style={{margin: "10vh 10px" , flexDirection:"column"}}>
      <div style={{marginBottom:"20px"}}>
        <span style={{marginRight:"30px"}}>I want to draw a</span>
        <SelectInputLatex data ={data}
        width={100}
        onChange={newValue => setselected(newValue)}
        />
      </div>
      <svg width={plot.width}
           height={plot.height}
           viewBox={"0 0 "+plot.width+" "+plot.height}>
       <foreignObject x="0" y="0" width={plot.x(100)} height={plot.y(100)}>
          <img src={red} width="100%" height="100%"/>
        </foreignObject>
      
     { selected === 1 &&  <polygon style={{fill:"yellow"}} 
        points={plot.polygon([
          {x: 50, y: 5},
          {x: 20, y: 80},
          {x: 80, y: 80}
        ])}/>}
     {selected === 2 && <rect x={plot.x(20)} y={plot.y(20)} width={plot.x(60)} height={plot.y(60)} style={{fill: "yellow"}}/>}
     {selected === 3 &&  <circle cx={plot.x(50)} cy={plot.y(50)} r={140} style={{fill: "yellow"}}/>}
     {selected === 4 &&  <polygon style={{fill:"yellow"}} 
        points={plot.polygon([
          {x: 50, y: 5},
          {x: 20, y: 50},
          {x: 50, y: 95} ,
          {x: 80, y: 50}
        ])}/>}
      </svg>
    </div>
  )
}

export default Step1
