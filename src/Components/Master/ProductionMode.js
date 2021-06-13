import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import MathResources from '../MathTools/MathResources'
import Translations from '../Translations/Translations'
import Tab from './Tab'
import ar from './Translations/ar.json'
import en from './Translations/en.json'
import VideoModal from './VideoModal/VideoModal'

function ProductionMode({
    LearnContent,
    CommonContent,
    QuizQuestions,
    QuizDefault,
    ChallengeQuestions,
    ChallengeDefault,
    InitMathTools,
    LanguageContext,
    EnglishTrans,
    ArabicTrans,
    Config,
    NextButtonUI,
    PreviousButtonUI,
    CustomTabs,
    Location,
    RailsLocale,
    video
    }) {
    const lang = RailsLocale
    let keys = lang == "en" ? EnglishTrans : ArabicTrans
    const language = {
        keys: keys,
        current: lang
    }
    const generalKeys = lang == "en" ? en : ar
    const LanguageProvider = LanguageContext.Provider;
    const [EDUStyle, setEDUStyle] = useState(false)
    const [LessonTemplate, setLessonTemplate] = useState(false)
    const [CentralizedThemeStyle, setCentralizedThemeStyle] = useState(false)
    const [Balloon, setBalloon] = useState(false)
    useEffect(() => {
        let EDUStyle = document.createElement('link');
        EDUStyle.rel = "stylesheet";
        EDUStyle.type = "text/css";
        EDUStyle.href = "https://www.eduapplications.org/react/CSS/EDU-style.css";
        EDUStyle.onload = () => setEDUStyle(true)
        let LessonTemplate = document.createElement('link');
        LessonTemplate.rel = "stylesheet";
        LessonTemplate.type = "text/css";
        LessonTemplate.href = "https://www.eduapplications.org/react/CSS/Lesson-template.css";
        LessonTemplate.onload = () => setLessonTemplate(true)
        let CentralizedThemeStyle = document.createElement('link');
        CentralizedThemeStyle.rel = "stylesheet";
        CentralizedThemeStyle.type = "text/css";
        CentralizedThemeStyle.href = "https://www.eduapplications.org/react/CSS/Centralized-theme-style.css";
        CentralizedThemeStyle.onload = () => setCentralizedThemeStyle(true)
        let Balloon = document.createElement('link');
        Balloon.rel = "stylesheet";
        Balloon.type = "text/css";
        Balloon.href = "https://www.eduapplications.org/react/CSS/balloon.css";
        Balloon.onload = () => setBalloon(true)
        document.head.appendChild(EDUStyle);
        document.head.appendChild(LessonTemplate);
        document.head.appendChild(CentralizedThemeStyle);
        document.head.appendChild(Balloon);
    }, [])
    useEffect(() => {
        if (EDUStyle == true && CentralizedThemeStyle == true && LessonTemplate == true && Balloon == true) {
            localStorage.setItem("language", RailsLocale);
            ReactDOM.render(
                <><Translations/>
                  {InitMathTools && <MathResources />}
                    <div className="container-fluid">
                        <br />
                        <div id="lessonPage" className={language.current}>
                            <LanguageProvider value={language}>
                                <div style={{ textAlign: language.keys['LanguageOptions']['style']['text-align'] }}>
                                    <h2>{language.keys['Lesson X Unit Y']}</h2>
                                    <div>
                                        <div id="Header-one" style={{ display: 'inline-block', width: "45%" }}>
                                            <h4>{language.keys['Lesson Name']}</h4>
                                        </div>
                                        <div style={{ display: 'inline-flex', width: '54%', justifyContent: 'flex-end' }}>
                                           <VideoModal video= {video} langKeys= {generalKeys} />
                                        </div>
                                    </div>
                                </div>
                                <div className="Centralized-layout">
                                    <div className="top-div"></div>
                                    <div className="centralizeThemeTab" align="center">
                                        <div className="tabbable">
                                            {typeof window === 'undefined' &&
                                                <StaticRouter location={Location} context={{}}>
                                                    <Switch>
                                                        <Route exact path="/lessons/:lessonSlug">
                                                            {Config.tabs.learn.visible == true && <Redirect to={`${Location}/learn?step=${Config.tabs.learn.currentStep}`} />}
                                                            {Config.tabs.learn.visible == false && Config.tabs.common.visible == true &&
                                                            <Redirect to={`${Location}/common?step=${Config.tabs.learn.currentStep}`} />}
                                                        </Route>
                                                        <Route path={"/lessons/:lessonSlug/:tab"} component={() => <Tab LearnContent={LearnContent}
                                                            CommonContent={CommonContent}
                                                            QuizQuestions={QuizQuestions}
                                                            QuizDefault={QuizDefault}
                                                            ChallengeQuestions={ChallengeQuestions}
                                                            ChallengeDefault={ChallengeDefault}
                                                            Config={Config}
                                                            LanguageContext={LanguageContext}
                                                            NextButtonUI={NextButtonUI}
                                                            PreviousButtonUI={PreviousButtonUI}
                                                            CustomTabs={CustomTabs}/>} />
                                                    </Switch>
                                                </StaticRouter>}
                                            {typeof window !== 'undefined' &&
                                                <BrowserRouter location={Location}>
                                                    <Switch>
                                                        <Route exact path="/lessons/:lessonSlug">
                                                            {Config.tabs.learn.visible == true && <Redirect to={`${Location}/learn?step=${Config.tabs.learn.currentStep}`} />}
                                                            {Config.tabs.learn.visible == false && Config.tabs.common.visible == true && 
                                                            <Redirect to={`${Location}/common?step=${Config.tabs.learn.currentStep}`} />}
                                                        </Route>
                                                        <Route path={"/lessons/:lessonSlug/:tab"} component={() => <Tab LearnContent={LearnContent}
                                                            CommonContent={CommonContent}
                                                            QuizQuestions={QuizQuestions}
                                                            QuizDefault={QuizDefault}
                                                            ChallengeQuestions={ChallengeQuestions}
                                                            ChallengeDefault={ChallengeDefault}
                                                            Config={Config}
                                                            LanguageContext={LanguageContext}
                                                            NextButtonUI={NextButtonUI}
                                                            PreviousButtonUI={PreviousButtonUI}
                                                            CustomTabs={CustomTabs}/>} />
                                                    </Switch>
                                                </BrowserRouter>}
                                        </div>
                                    </div>
                                </div>
                            </LanguageProvider>
                        </div>
                    </div></>,
                document.getElementById("appTemplateContent"), () => {
                    window.onbeforeunload = function(){
                        sessionStorage.clear();
                    }
                }
            )
        }
    }, [EDUStyle, LessonTemplate, CentralizedThemeStyle, Balloon])
    return (<div id="appTemplateContent" />)
}
export default ProductionMode;