import React , { useContext , useState} from 'react'
import Language from '../../Translations/LanguageContext'

const Step2 = () => {
  const Lang = useContext(Language);
  return(
    <div className = "row flex-center wrapflex text-out" style={{margin: "10vh 10px"}}>
      {Lang.keys['Step two content']}
    </div>
  )
}

export default Step2
