import React, { useState, useContext } from "react";
import { ButtonMain, Modal, SweetAlert } from "@gazzar97/widgets";

function QuizHandeller({ questions = [], defaultQuestion = null, Language = null}) {

    const Lang = useContext(Language);
    const [quizData, setQuizData] = useState({
        questionPool: Array.from({length: questions.length}, (_, index) => index + 1),
        current: {
            number: defaultQuestion === null ? Math.floor(Math.random() * questions.length) + 1 : defaultQuestion,
            request: "init" + Math.random(Math.floor() * 1000),
            countedAsWrong: false,
            countedAsAnswerShown: false
        },
        statistics: {
            score: 0,
            easy: { total: 0, correct: 0, wrong: 0, answerShown: 0 },
            medium: { total: 0, correct: 0, wrong: 0, answerShown: 0 },
            hard: { total: 0, correct: 0, wrong: 0, answerShown: 0 }
        }
    });
    const [answerData, setAnswerData] = useState({
        show: false,
        UI: <div/>
    })
    const newQuestion = () => {
        let currentQuestioni = quizData.questionPool.findIndex((i) => i === quizData.current.number);
        let tempQuestionPool = Array.from({length: quizData.questionPool.length}, (_, index) => quizData.questionPool[index])
        tempQuestionPool.splice(currentQuestioni, 1);
        if(tempQuestionPool.length == 0) tempQuestionPool = Array.from({length: questions.length}, (_, index) => index + 1);
        let newQuestionNumber = tempQuestionPool[Math.floor(Math.random() * tempQuestionPool.length)];
        setQuizData({
            ...quizData,
            questionPool: Array.from({length: tempQuestionPool.length}, (_, index) => tempQuestionPool[index]),
            current: {
                number: defaultQuestion === null ? newQuestionNumber : defaultQuestion,
                request: "init" + Math.random(Math.floor() * 1000),
                countedAsWrong: false,
                countedAsAnswerShown: false
            }
        });
    };
    const showAnswer = async() => {
        setQuizData({
            ...quizData,
            current: {
                ...quizData.current,
                request : "answerUI" + Math.floor(Math.random() * 1000),
                countedAsAnswerShown: true
            },
            statistics: {
                ...quizData.statistics,
                easy: {
                    ...quizData.statistics.easy,
                    answerShown: quizData.current.countedAsAnswerShown === false && quizData.current.difficulty === "easy" ? quizData.statistics.easy.answerShown + 1 : quizData.statistics.easy.answerShown
                },
                medium: {
                    ...quizData.statistics.medium,
                    answerShown: quizData.current.countedAsAnswerShown === false && quizData.current.difficulty === "medium" ? quizData.statistics.medium.answerShown + 1 : quizData.statistics.medium.answerShown
                },
                hard: {
                    ...quizData.statistics.hard,
                    answerShown: quizData.current.countedAsAnswerShown === false && quizData.current.difficulty === "hard" ? quizData.statistics.hard.answerShown + 1 : quizData.statistics.medium.answerShown
                }
            }
        })
    };
    const submitSolution = async () => {
        if(quizData.current.countedAsAnswerShown === true) {
            SweetAlert(Lang.keys['You viewed the answer'], Lang.keys['Please go to the next question'], "info");
            return;
        }
        setQuizData({
            ...quizData,
            current: {
                ...quizData.current,
                request : "submit" + Math.floor(Math.random() * 1000)
            }
        })
    };
    let Question = questions[quizData.current.number-1]
    return (
        <div>
            <Question request={quizData.current.request} onResponse={
                (data) => {
                    if(quizData.current.request.includes("init")) {
                        setQuizData({
                            ...quizData,
                            current : {
                                ...quizData.current,
                                weight: data.weight,
                                difficulty: data.difficulty,
                                visible: data.visible
                            },
                            statistics: {
                                ...quizData.statistics,
                                easy: {
                                    ...quizData.statistics.easy,
                                    total: data.difficulty === "easy" ? quizData.statistics.easy.total + 1 : quizData.statistics.easy.total
                                },
                                medium: {
                                    ...quizData.statistics.medium,
                                    total: data.difficulty === "medium" ? quizData.statistics.medium.total + 1 : quizData.statistics.medium.total
                                },
                                hard: {
                                    ...quizData.statistics.hard,
                                    total: data.difficulty === "hard" ? quizData.statistics.hard.total + 1 : quizData.statistics.hard.total
                                }
                            }
                        })
                    }
                    else if(quizData.current.request.includes("submit")) {
                        if (data === "empty") SweetAlert(Lang.keys['Missing values'], Lang.keys['Please enter all values'], "info");
                        else if (data === "syntax error") SweetAlert(Lang.keys['Syntax error'], Lang.keys['Some answers have syntax error'], "info");
                        else if (data === "wrong") {
                            SweetAlert(Lang.keys['Wrong Answer'], Lang.keys['Please try again'], "error");
                            setQuizData({
                                ...quizData,
                                current: {
                                    ...quizData.current,
                                    countedAsWrong: true
                                },
                                statistics: {
                                    ...quizData.statistics,
                                    easy: {
                                        ...quizData.statistics.easy,
                                        wrong: quizData.current.countedAsWrong === false && quizData.current.difficulty === "easy" ? quizData.statistics.easy.wrong + 1 : quizData.statistics.easy.wrong
                                    },
                                    medium: {
                                        ...quizData.statistics.medium,
                                        wrong: quizData.current.countedAsWrong === false && quizData.current.difficulty === "medium" ? quizData.statistics.medium.wrong + 1 : quizData.statistics.medium.wrong
                                    },
                                    hard: {
                                        ...quizData.statistics.hard,
                                        wrong: quizData.current.countedAsWrong === false && quizData.current.difficulty === "hard" ? quizData.statistics.hard.wrong + 1 : quizData.statistics.hard.wrong
                                    }
                                }
                            })
                        }
                        else if(data === "correct"){
                            SweetAlert(Lang.keys['Correct Answer'], Lang.keys['Well Done'], "success");
                            let currentQuestioni = quizData.questionPool.findIndex((i) => i === quizData.current.number);
                            let tempQuestionPool = Array.from({length: quizData.questionPool.length}, (_, index) => quizData.questionPool[index]);
                            tempQuestionPool.splice(currentQuestioni, 1);
                            if(tempQuestionPool.length == 0) tempQuestionPool = Array.from({length: questions.length}, (_, index) => index + 1);
                            let newQuestionNumber = tempQuestionPool[Math.floor(Math.random() * tempQuestionPool.length)];
                            setQuizData({
                                questionPool: Array.from({length: tempQuestionPool.length}, (_, index) => tempQuestionPool[index]),
                                current: {
                                    number: defaultQuestion == null ? newQuestionNumber : defaultQuestion,
                                    request: "init" + Math.random(Math.floor() * 1000),
                                    countedAsWrong: false,
                                    countedAsAnswerShown: false
                                },
                                statistics: {
                                    score: quizData.statistics.score + quizData.current.weight,
                                    easy: {
                                        ...quizData.statistics.easy,
                                        correct: quizData.current.difficulty === "easy" ? quizData.statistics.easy.correct + 1 : quizData.statistics.easy.correct
                                    },
                                    medium: {
                                        ...quizData.statistics.medium,
                                        correct: quizData.current.difficulty === "medium" ? quizData.statistics.medium.correct + 1 : quizData.statistics.medium.correct
                                    },
                                    hard: {
                                        ...quizData.statistics.hard,
                                        correct: quizData.current.difficulty === "hard" ? quizData.statistics.hard.correct + 1 : quizData.statistics.hard.correct
                                    }
                                }
                            })
                        }
                        else SweetAlert(Lang.keys[data.title], Lang.keys[data.description], "info");
                    }
                    else if(quizData.current.request.includes("answerUI")) {
                        setAnswerData({
                            show: true,
                            UI: data
                        });
                    }
                }
            } />
            <br />
            {quizData.current.visible && <>
                <div className="row col-sm-12 flex-center"
                     style={{margin: "20px 0"}}>
                    {quizData.current.visible.showAnswer &&
                    <div className="col-sm-3 flex-center">
                        <ButtonMain onClick={showAnswer} value = "show answer">
                            {Lang.keys['Show Answer']}
                        </ButtonMain>
                    </div>
                    }
                    {quizData.current.visible.submitSolution &&
                    <div className="col-sm-3 flex-center">
                        <ButtonMain onClick={submitSolution} value = "submit solution">
                            {Lang.keys['Submit Solution']}
                        </ButtonMain>
                    </div>
                    }
                    {quizData.current.visible.newQuestion &&
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
                 Question Type {quizData.current.number}
            </div>
        </div>
    );
}

export default QuizHandeller;
