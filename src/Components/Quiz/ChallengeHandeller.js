import React, { useState, useContext } from "react";
import { ButtonMain, Modal, SweetAlert } from "@gazzar97/widgets";

function ChallengeHandeller({ questions = [], defaultQuestion = null, Language = null}) {

    const Lang = useContext(Language);
    const [challengeData, setChallengeData] = useState({
        current: {
            number: defaultQuestion == null ? 1 : defaultQuestion,
            request: "init" + Math.random(Math.floor() * 1000),
            answerShown: false
        }
    });
    const [answerData, setAnswerData] = useState({
        show: false,
        UI: <div/>
    })
    const newQuestion = () => {
        setChallengeData({
            current: {
                number: defaultQuestion == null ? challengeData.current.number + 1 : defaultQuestion,
                request: "init" + Math.random(Math.floor() * 1000),
                answerShown: false
            }
        });
    };
    const showAnswer = async() => {
        setChallengeData({
            current: {
                ...challengeData.current,
                request : "answerUI" + Math.floor(Math.random() * 1000),
                answerShown: true
            }
        })
    };
    const submitSolution = async () => {
        if(challengeData.current.answerShown == true) {
            SweetAlert(Lang.keys['You viewed the answer'], Lang.keys['Please go to the next question'], "info");
            return;
        }
        setChallengeData({
            current: {
                ...challengeData.current,
                request : "submit" + Math.floor(Math.random() * 1000)
            }
        })
    };
    let Question = questions[challengeData.current.number-1]
    return (
        <div>
            <Question request={challengeData.current.request} onResponse={
                (data) => {
                    if(challengeData.current.request.includes("init")) {
                        setChallengeData({
                            current : {
                                ...challengeData.current,
                                visible: data.visible
                            }
                        })
                    }
                    else if(challengeData.current.request.includes("submit")) {
                        if (data === "empty") SweetAlert(Lang.keys['Missing values'], Lang.keys['Please enter all values'], "info");
                        else if (data === "syntax error") SweetAlert(Lang.keys['Syntax error'], Lang.keys['Some answers have syntax error'], "info");
                        else if (data === "wrong") SweetAlert(Lang.keys['Wrong Answer'], Lang.keys['Please try again'], "error");
                        else if (data === "correct") {
                            SweetAlert(Lang.keys['Correct Answer'], Lang.keys['Well Done'], "success");
                            if(challengeData.current.number < questions.length) {
                                setChallengeData({
                                    current: {
                                        number: defaultQuestion == null ? challengeData.current.number + 1 : defaultQuestion,
                                        request: "init" + Math.random(Math.floor() * 1000),
                                        answerShown: false
                                    }
                                })
                            }
                        }
                        else SweetAlert(Lang.keys[data.title], Lang.keys[data.description], "info");
                    }
                    else if(challengeData.current.request.includes("answerUI")) {
                        setAnswerData({
                            show: true,
                            UI: data
                        });
                    }
                }
            } />
            <br />
            {challengeData.current.visible && <>
                <div className="row col-sm-12 flex-center"
                     style={{margin: "20px 0"}}>
                    {challengeData.current.visible.showAnswer &&
                    <div className="col-sm-3 flex-center">
                        <ButtonMain onClick={showAnswer} value = "show answer">
                            {Lang.keys['Show Answer']}
                        </ButtonMain>
                    </div>
                    }
                    {challengeData.current.visible.submitSolution &&
                     <div className="col-sm-3 flex-center">
                        <ButtonMain onClick={submitSolution} value = "submit solution">
                            {Lang.keys['Submit Solution']}
                        </ButtonMain>
                     </div>
                    }
                    {challengeData.current.visible.newQuestion && challengeData.current.number < questions.length &&
                    <div className="col-sm-3 flex-center">
                        <ButtonMain onClick={newQuestion} value = "new question">
                            {Lang.keys['New Question']}
                        </ButtonMain>
                    </div> 
                    }
                </div>
                <Modal width={45} onClose={() => setAnswerData({show : false, UI : <div/>})} title={Lang.keys['The Correct Answer']} show={answerData.show}>
                    {answerData.UI}
                </Modal>
            </>}
            <div className = "flex-center"
                 style={{fontSize: "20px", background: "#D4D4D4"}}>
                 Question Type {challengeData.current.number}
            </div>
        </div>
    );
}

export default ChallengeHandeller;
