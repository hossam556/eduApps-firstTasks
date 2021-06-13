import React, { useState, useEffect } from "react";
import CompareResults from 'Components/Utilities/CompareResults'
import Language from '../../Translations/LanguageContext'
import tnum from 'Components/Translations/tnum'
import {RadioButtonGroup} from '@gazzar97/widgets'
import Sample from 'Components/Utilities/Sample'
import Shuffle from "Components/Utilities/Shuffle";
import MJ from 'Components/Translations/MJ'

function Question1(props) {

    const [questionData, setQuestionData] = useState({});
    const [selected , setselected] = useState();
    

    // const getBaseLog= (y) => {
    //     return Math.log(y) / Math.log(2);
        
    // }

    // const getRandomNo = () => {
    //     let randomNo = []
    //     for(let i=1 ; i < 11 ; i++ ){
    //          randomNo.push(Math.pow(2, i))
    //     }

    //     const randomIndex = Math.floor(Math.random() * randomNo.length);
    //     return randomNo[randomIndex]
    // }
      

    useEffect(() => {
        if(props.request.includes("init")) {
            let init = async() => {
                let b = Sample(1 , 10 ,4) ;      

                let question = Math.pow(2, b[3]);
                
                let RadioData = Shuffle([
                    {
                        id : 1 ,
                        value : <MJ j={`2^{${b[3]}}`}/> ,
                        question : question
                    },
                    {
                        id : 2 ,
                        value : <MJ j={`2^{${b[0]}}`}/>
                    },
                    {
                        id : 3 ,
                        value : <MJ j={`2^{${b[1]}}`}/>
                    },
                    {
                        id : 4 ,
                        value : <MJ j={`2^{${b[2]}}`}/>
                    },
                ])
                let variables = {
                    data : RadioData ,
                    question : question, 
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
                        return CompareResults(parseInt(selected), 1);
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
            let correctAns = questionData.variables.data.find(item => item.id === 1);

            let answerUI = async () => {
                props.onResponse(
                    <div>
                        {correctAns.value}
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
            <div>
                <p style={{fontSize:'25px'}}>{questionData.variables.question} is :</p>
            </div>
            <RadioButtonGroup
            key={questionData.variables.inputKey}
            data={questionData.variables.data}
            name ="radio1"
            onChange={element => setselected(element.target.id)}
            mode= {3}
            />
        </div>
        }
        </>
    );
};
export default Question1;
