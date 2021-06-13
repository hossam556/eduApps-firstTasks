import React from 'react'
import DevelopmentMode from 'Components/Master/DevelopmentMode'
import LanguageContext from './Translations/LanguageContext'
import English from './Translations/en.json'
import Arabic from './Translations/ar.json'
import Config from './Content/TabConfig'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import './Styles/custom-styles.css'
import './Styles/media-query.css'

function Lesson({location = ''}) {
  let LearnContent = [];
  for (let i = 0; i < Config.tabs.learn.numberOfSteps; i++) LearnContent.push(require(`./Content/Learn/step${i + 1}`).default);
  let CommonContent = [];
  for (let i = 0; i < Config.tabs.common.numberOfSteps; i++) CommonContent.push(require(`./Content/Common/step${i + 1}`).default);
  let QuizQuestions = [];
  for (let i = 0; i < Config.tabs.quiz.numberOfQuestions; i++) QuizQuestions.push(require(`./Content/Quiz/Question${i + 1}`).default);
  let ChallengeQuestions = [];
  for (let i = 0; i < Config.tabs.challenge.numberOfQuestions; i++) ChallengeQuestions.push(require(`./Content/Challenge/Question${i + 1}`).default);
  return (
    <DevelopmentMode
      LearnContent={LearnContent}
      CommonContent={CommonContent}
      QuizQuestions={QuizQuestions}
      QuizDefault={null}
      ChallengeQuestions={ChallengeQuestions}
      ChallengeDefault={null}
      InitMathTools={false}
      LanguageContext={LanguageContext}
      EnglishTrans={English}
      ArabicTrans={Arabic}
      Config={Config}
      Location={location}/>
  )
}
export default Lesson;
