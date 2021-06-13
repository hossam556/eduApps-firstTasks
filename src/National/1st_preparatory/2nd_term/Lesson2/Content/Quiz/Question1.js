import React, { useState, useEffect ,useContext } from "react";
import CompareResults from 'Components/Utilities/CompareResults'
import Plot from 'Components/Plot/Plot'
import red from '../../images/red.jpg'
import {NumericInput} from '@gazzar97/widgets'
import Sample from 'Components/Utilities/Sample'
import MJ from 'Components/Translations/MJ'
import Language from '../../Translations/LanguageContext'

function Question1(props) {
    const Lang = useContext(Language);
    const [questionData, setQuestionData] = useState({});
    const [plot, setPlot] = useState(new Plot([500,500], [400,400], [250,250]));
    const [userInput , setuserInput] = useState();

    useEffect(() => {
        if(props.request.includes("init")) {
            let init = async() => {
                let h = Sample(5 , 40 ,1) ;
                let b = Sample(5 , 20 ,1) ;

                let variables = {
                    inputKey : "num1" + Math.random() * 1000 ,
                    h :h ,
                    b : b
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
                        return CompareResults(userInput, 0.5 * questionData.variables.h * questionData.variables.b);
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
                        {0.5 * questionData.variables.h * questionData.variables.b}
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
            <div style={{marginBottom:"20px"}}>
                    <span>{Lang.keys['calculate the area of the triangle given that the area = 1/2 * base * height']}</span>
            </div>
            <svg width={plot.width}
                height={plot.height}
                viewBox={"0 0 "+plot.width+" "+plot.height}>
            <foreignObject x="0" y="0" width={plot.x(100)} height={plot.y(100)}>
                <img src={red} width="100%" height="100%"/>
            </foreignObject>
            
            <polygon style={{fill:"yellow"}} 
                points={plot.polygon([
                {x: 50, y: 10},
                {x: 20, y: 70},
                {x: 80, y: 70}
                ])}/>
             <line x1={plot.x(50)} y1={plot.y(10)} x2={plot.x(50)} y2={plot.y(70)} style={{stroke: "black", strokeWidth: 3}} />
             <foreignObject x={plot.x(33)} y={plot.x(40)} width={plot.x(20)} height={plot.y(20)}>
                <span style={{fontSize:"14px" ,fontWeight:'bold'}}>{questionData.variables.h} cm</span>
            </foreignObject>
            <foreignObject x={plot.x(25)} y={plot.x(65)} width={plot.x(20)} height={plot.y(20)}>
                <span style={{fontSize:"14px" ,fontWeight:'bold'}}>{questionData.variables.b * 0.5} cm</span>
            </foreignObject>
            <foreignObject x={plot.x(50)} y={plot.x(65)} width={plot.x(20)} height={plot.y(20)}>
                <span style={{fontSize:"14px" ,fontWeight:'bold'}}>{questionData.variables.b * 0.5} cm</span>
            </foreignObject>
            </svg>
            <div className="flex-center" style={{marginTop:"30px"}}>             
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
