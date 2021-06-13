import React, { useState, useEffect } from "react";
import CompareResults from 'Components/Utilities/CompareResults'
function Question1(props) {

    const [questionData, setQuestionData] = useState({});
    useEffect(() => {
        if(props.request.includes("init")) {
            let init = async() => {
                let variables = { }
                let data = {
                    variables: variables,
                    visible: {
                        showAnswer: true,
                        submitSolution: true,
                        newQuestion: true
                    }
                }
                setQuestionData({ ...data });
                props.onResponse(data);
            }
            init();
        }
        else if(props.request.includes("submit")) {
            let answers = {
                input1 : {
                    validate: async function() {
                        return CompareResults(5, 5);
                    }
                }
            }
            let submit = async () => {
                let empty = false, wrong = false, syntaxError = false;
                await Promise.all(Object.keys(answers).map(async (i) => {
                    let result = await answers[i].validate();
                    if (result === "empty") empty = true; 
                    else if (result === "wrong")  wrong = true; 
                    else if (result === "syntax error") syntaxError = true;
                }))
                if(empty === true)props.onResponse("empty");
                else if(syntaxError === true)props.onResponse("syntax error");
                else if(wrong === true)props.onResponse("wrong");
                else props.onResponse("correct");
            }
            submit();
        }
        else if(props.request.includes("answerUI")) {
            let answerUI = async () => {
                props.onResponse(
                    <div>
                        Answer content
                    </div>
                )
            }
            answerUI();
        }
    }, [props.request])

    return (
        <>{
        questionData.variables &&
        <div/>
        }
        </>
    );
};
export default Question1;
