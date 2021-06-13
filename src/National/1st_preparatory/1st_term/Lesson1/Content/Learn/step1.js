import React , { useContext , useState} from 'react'
import Language from '../../Translations/LanguageContext'
import MJ from 'Components/Translations/MJ'
import {NumericInput} from '@gazzar97/widgets'

const Step1 = () => {
  const Lang = useContext(Language);
  const [value , setValue] = useState(5);

  return(
    <div className = "row flex-center wrapflex text-out" style={{margin: "10vh 10px"}}>
      {Lang.keys['Step one content']}
      <NumericInput value={5} onChange={currentValue => setValue(currentValue)}/>
      <MJ j={`\\sqrt{${value}}`}/>
    </div>
  )
}

export default Step1
