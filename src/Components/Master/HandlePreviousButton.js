import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonMain, ButtonTemp } from '@gazzar97/widgets';

const HandlePreviousButton = ({ LanguageContext,
  Config,
  currentTab,
  currentStep,
  lessonSlug }) => {
  const Lang = useContext(LanguageContext);
  const history = useHistory();
  let RenderedButton = (currentTab === 'common' && Number(currentStep) === 1)
                       ? ButtonTemp : ButtonMain;
  return (
    <RenderedButton
      onClick={() => {
        if (currentTab === 'learn' && Number(currentStep) > 1) history.push(`/lessons/${lessonSlug}/learn?step=${Number(currentStep) - 1}`)
        else if (currentTab === 'common' && Number(currentStep) > 1) history.push(`/lessons/${lessonSlug}/common?step=${Number(currentStep) - 1}`)
        else if (currentTab === 'common' && Number(currentStep) === 1) history.push(`/lessons/${lessonSlug}/learn?step=${Config.tabs.learn.numberOfSteps}`)
      }}
      style={(currentTab === 'learn' && Number(currentStep) === 1) ? { display: "none" } : { width: "170px", whiteSpace: "nowrap" }}>
      {currentTab === 'learn' && Number(currentStep) > 1 && Lang.keys['Previous Button']}
      {currentTab === 'common' && Number(currentStep) > 1 && Lang.keys['Previous Button']}
      {currentTab === 'common' && Number(currentStep) === 1 && Lang.keys['Learn']}
    </RenderedButton>
  )
};

export default HandlePreviousButton
