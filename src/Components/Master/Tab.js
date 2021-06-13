import React , {useState} from 'react'
import { useParams } from 'react-router'
import NavTabs from './NavTabs'
import HandleNextButton from './HandleNextButton'
import HandlePreviousButton from './HandlePreviousButton'
import QuizHandeller from '../Quiz/QuizHandeller'
import ChallengeHandeller from '../Quiz/ChallengeHandeller'
import { ProgressBar } from '@gazzar97/widgets';

const Tab = ({LearnContent = [],
              CommonContent = [],
              QuizQuestions = [],
              QuizDefault = null,
              ChallengeQuestions = [],
              ChallengeDefault = null,
              Config = {},
              LanguageContext = null,
              NextButtonUI = null,
              PreviousButtonUI = null,
              CustomTabs = {}}) => {
  const { tab } = useParams();
  const lessonSlug = "localapp";
  let content = <></>;
  let step = new URLSearchParams(window.location.search).get('step');
  let progressBarValue = 0;
  if (tab === 'learn') {
    if(step && step > 0 && step <= LearnContent.length) {
      let UI = LearnContent[step-1];
      progressBarValue = step/Config.tabs.learn.numberOfSteps*100;
      content = <UI/>
    }
    else content = <div>Please enter a step in range [1 , {LearnContent.length}]</div>
  }
  else if (tab === 'common') {
    if(step && step > 0 && step <= CommonContent.length) {
      let UI = CommonContent[step-1];
      progressBarValue = step/Config.tabs.common.numberOfSteps*100;
      content = <UI/>
    }
    else content = <div>Please enter a step in range [1 , {CommonContent.length}]</div>
  } 
  else if(tab === 'quiz') content = <QuizHandeller questions = {QuizQuestions} defaultQuestion = {QuizDefault} Language = {LanguageContext}/>
  else if(tab === 'challenge') content = <ChallengeHandeller questions = {ChallengeQuestions} defaultQuestion = {ChallengeDefault} Language = {LanguageContext}/>
  else if(CustomTabs[tab]){
    let CustomTabComponent = CustomTabs[tab].component;
    content = <CustomTabComponent props={{...CustomTabs[tab].props}}/>
  }
  return (
    <><NavTabs LanguageContext={LanguageContext} 
               Config={Config}     
               tab={tab} 
               lessonSlug={lessonSlug}/>
        {(tab === 'learn' || tab === 'common') &&
        <div className="flex-center" style={{margin: "20px 0"}}>
          <ProgressBar width = {35} value = {progressBarValue} />
        </div>}
        {content}
        {(tab === 'learn' || tab === 'common') &&
        <footer>
          <div className='footer' style = {{margin: "25px 0", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
          {PreviousButtonUI !== null ? 
             <PreviousButtonUI LanguageContext={LanguageContext} Config={Config} currentTab={tab} currentStep={step} lessonSlug={lessonSlug}/> :
             <HandlePreviousButton LanguageContext={LanguageContext} Config={Config} currentTab={tab} currentStep={step} lessonSlug={lessonSlug}/>}
          {NextButtonUI !== null ? 
            <NextButtonUI LanguageContext={LanguageContext} Config={Config} currentTab={tab} currentStep={step} lessonSlug={lessonSlug}/> :
            <HandleNextButton LanguageContext={LanguageContext} Config={Config} currentTab={tab} currentStep={step} lessonSlug={lessonSlug}/>}
         </div>
        </footer>}</>)
}

export default Tab
