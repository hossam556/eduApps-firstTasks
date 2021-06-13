import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

function serializeParams(obj){
    var str = ""
    for (var key in obj) {
        if (str != "") {
            str += "&"
        }
        str += key + "=" + encodeURIComponent(obj[key])
    }
    return str
}

function serializeLinkUrl(tab, lessonSlug, params){
    return `/lessons/${lessonSlug}/${tab}${ params && Object.keys(params).length > 0 ? `?${serializeParams(params)}` : ''}`
}

function isCompleted(tab) {
    if((tab === "learn" && sessionStorage.getItem("learnCompleted")) 
     ||(tab === "common" && sessionStorage.getItem("commonCompleted"))) {
        return {color: "white", background: "green", cursor: "pointer"};
    }
    return {};
}

const NavTabs = ({LanguageContext, 
                  Config,
                  tab,
                  lessonSlug}) => {
  const Lang = useContext(LanguageContext);
  let navTabs = []

  for(let navTab in Config.tabs){
      const myTab = Config.tabs[navTab]
      if (!myTab.visible) continue;
      if(navTab === tab){
          navTabs.push((
            <li key = {navTab} className="active">
                <Link style={isCompleted(navTab)} 
                      to={serializeLinkUrl(navTab, lessonSlug, myTab.params)} data-value={navTab} onClick={(e) => e.preventDefault()}>{Lang.keys[myTab.name]}</Link>
            </li>
          ))
      }else{
        navTabs.push((
            <li key = {navTab}>
                <Link style={isCompleted(navTab)}
                      to={serializeLinkUrl(navTab, lessonSlug, myTab.params)}>{Lang.keys[myTab.name]}</Link>
            </li>
          ))
      }
  }
  return (
    <ul className="nav nav-tabs" id="tabs">
        {navTabs}
    </ul>
  )
}

export default NavTabs