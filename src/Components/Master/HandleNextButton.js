import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonMain, ButtonTemp } from '@gazzar97/widgets';

const HandleNextButton = ({ LanguageContext,
  Config,
  currentTab,
  currentStep,
  lessonSlug }) => {
  const Lang = useContext(LanguageContext);
  const history = useHistory();
  let RenderedButton = ((currentTab === 'learn' && Number(currentStep) === Number(Config.tabs.learn.numberOfSteps))
                       ||(currentTab === 'common' && Number(currentStep) === Number(Config.tabs.common.numberOfSteps)))
                       ? ButtonTemp : ButtonMain;
  return (
    <RenderedButton
      onClick={() => {
        if (currentTab === 'learn' && Number(currentStep) === Number(Config.tabs.learn.numberOfSteps)) {
          sessionStorage.setItem("learnCompleted", "yes");
          history.push(`/lessons/${lessonSlug}/common?step=1`);
        } 
        else if (currentTab === 'common' && Number(currentStep) === Number(Config.tabs.common.numberOfSteps)) {
          sessionStorage.setItem("commonCompleted", "yes");
          history.push(`/lessons/${lessonSlug}/quiz`)
        } 
        else if (currentTab === 'learn') history.push(`/lessons/${lessonSlug}/learn?step=${Number(currentStep) + 1}`)
        else if (currentTab === 'common') history.push(`/lessons/${lessonSlug}/common?step=${Number(currentStep) + 1}`)
      }}
      style={{ width: "170px", whiteSpace: "nowrap" }}>
      {currentTab === 'learn' && Number(currentStep) === Number(Config.tabs.learn.numberOfSteps) && Lang.keys['Common Examples']}
      {currentTab === 'common' && Number(currentStep) === Number(Config.tabs.common.numberOfSteps) && Lang.keys['Quiz']}
      {currentTab === 'learn' && Number(currentStep) !== Number(Config.tabs.learn.numberOfSteps) && Lang.keys['Next Button']}
      {currentTab === 'common' && Number(currentStep) !== Number(Config.tabs.common.numberOfSteps) && Lang.keys['Next Button']}
    </RenderedButton>
  )
}

export default HandleNextButton