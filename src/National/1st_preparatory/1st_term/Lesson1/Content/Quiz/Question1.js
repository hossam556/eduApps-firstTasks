import React, { useState, useEffect ,useContext } from "react";
import CompareResults from 'Components/Utilities/CompareResults'
import Sample from 'Components/Utilities/Sample'
import Language from '../../Translations/LanguageContext'
import tnum from 'Components/Translations/tnum'
import {NumericInput} from '@gazzar97/widgets'


function Question1(props) {
    const Lang = useContext(Language);

    const [questionData, setQuestionData] = useState({});
    const [userInput , setuserInput] = useState();

    useEffect(() => {
        if(props.request.includes("init")) {
            let init = async() => {
                let a = Sample(-100 , 100 ,1) ;
                let variables = {
                    a : a,
                    inputKey : "num1" + Math.random() * 1000
                 }
                let data = {
                    weight: 5,
                    difficulty: "easy",
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
                        return CompareResults(parseInt(userInput), -questionData.variables.a);
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
                        {`${Lang.keys["inverse is "]} ${tnum(-questionData.variables.a)}`}
                    </div>
                )
            }
            answerUI();
        }
    }, [props.request])

    return (
        <>{
        questionData.variables &&
        <div>
            <p>{Lang.keys['Enter the inverse value of :']} {tnum(questionData.variables.a)}</p>
            <div className="flex-center">             
                <NumericInput 
                key={questionData.variables.inputKey}
                onChange={(value) => setuserInput(value)}/>
            </div>
        </div>
        }
        </>
    );
};
export default Question1;
