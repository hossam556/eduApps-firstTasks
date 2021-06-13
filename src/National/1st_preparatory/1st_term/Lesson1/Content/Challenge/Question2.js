import React, { useState, useEffect,useContext } from "react";
import CompareResults from 'Components/Utilities/CompareResults'
import Language from '../../Translations/LanguageContext'
import tnum from 'Components/Translations/tnum'
import Sample from 'Components/Utilities/Sample'
import {NumericInput} from '@gazzar97/widgets'

function Question1(props) {
    const Lang = useContext(Language);

    const [questionData, setQuestionData] = useState({});
    const [userInput , setuserInput] = useState();
    const [userInput2 , setuserInput2] = useState();

    function reduce(numerator,denominator){
        var gcd = function gcd(a,b){
          return b ? gcd(b, a%b) : a;
        };
        gcd = gcd(numerator,denominator);
        return  [numerator/gcd,denominator/gcd] ;
      }
      


    useEffect(() => {
        if(props.request.includes("init")) {
            let init = async() => {
                let a = Sample(-1000 , 1000 ,1) ;
                let b = Sample(-1000 , 1000 ,1) ;

                let variables = {
                    a : a, 
                    b : b ,
                    inputKey : "num1" + Math.random() * 1000,
                    inputKey2 : "num1" + Math.random() * 1000
                 }
                 
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
                        return CompareResults(userInput, reduce(questionData.variables.a,questionData.variables.b)[0]);
                    }
                },
                input2 : {
                    validate: async function() {
                        return CompareResults(userInput2, reduce(questionData.variables.a,questionData.variables.b)[1]);
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
                let result = reduce(questionData.variables.a,questionData.variables.b);
                props.onResponse(

                    <div>
                        {`${Lang.keys["Answer is "]} ${tnum(result[0])} / ${tnum(result[1])}`}
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
            <p>{Lang.keys['Find the simplified form of this fraction :']} {`${tnum(questionData.variables.a)}/${tnum(questionData.variables.b)}`}</p>
            <div className="flex-center">
                <NumericInput 
                    key={questionData.variables.inputKey}
                    onChange={(value) => setuserInput(value)}/>
                    <span style={{fontSize:"50px" ,color:'orange'}}>/</span>
                <NumericInput 
                    key={questionData.variables.inputKey2}
                    onChange={(value) => setuserInput2(value)}/>
            </div>
        </div>
        }
        </>
    );
};
export default Question1;
