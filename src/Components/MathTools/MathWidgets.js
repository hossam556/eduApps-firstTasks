
import React, { useEffect, useState } from 'react'
import MJ from '../Translations/MJ'

function MathWidgets({ containerId = "qd" + Math.round(Math.random() * 1000000).toString(), 
                       containerClass = "" ,
                       resourcesUrl = "github"}) {
    const [reactive, setReactive] = useState({})
    let language = localStorage.getItem("language") == undefined ? "en" : localStorage.getItem("language");
    let resUrl = (resourcesUrl == "github" ? "https://kareemmohamed95.github.io/" : "https://www.eduapplications.org/") + "react/math-assets/mathtools-trans.json";
    useEffect(() => {
        function init() {
            if (typeof window === 'undefined') {
                setTimeout(init, 500);
                return;
            }
            if (window.$ === undefined || window.$ === null) {
                setTimeout(init, 500);
                return;
            }
            fetch(resUrl)
            .then(ress => ress.json())
            .then(res => {
                setReactive({ translations: res });
            })
        }
        init();
    }, [])
    return (
        <>
        {reactive.translations &&
        <div id = {containerId}
            className={"new-qwidgets-div " + containerClass}
            style={{ direction: "ltr" }}>
            <div className="row flex-center mb2-quill-div"
                style={{ padding: "0 20px" }}>
                <div className="col-sm-12 upper-quill-div" />
            </div>
            <div className="row mb-quill-div pd-quill-div">
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addSinSymbol()}>
                        {reactive.translations[language]["sin"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCosSymbol()}>
                        {reactive.translations[language]["cos"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addTanSymbol()}>
                        {reactive.translations[language]["tan"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCosecSymbol()}>
                        {reactive.translations[language]["cosec"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addSecSymbol()}>
                        {reactive.translations[language]["sec"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCotanSymbol()}>
                        {reactive.translations[language]["cotan"]}
                    </button>
                </div>
            </div>

            <div className="row mb-quill-div pd-quill-div">
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addSinSquareSymbol()}>
                        <MJ j={reactive.translations[language]["sin_square"]}></MJ>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCosSquareSymbol()}>
                        <MJ j={reactive.translations[language]["cos_square"]}></MJ>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addTanSquareSymbol()}>
                        <MJ j={reactive.translations[language]["tan_square"]}></MJ>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCosecSquareSymbol()}>
                        <MJ j={reactive.translations[language]["cosec_square"]}></MJ>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addSecSquareSymbol()}>
                        <MJ j={reactive.translations[language]["sec_square"]}></MJ>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addCotanSquareSymbol()}>
                        <MJ j={reactive.translations[language]["cotan_square"]}></MJ>
                    </button>
                </div>
            </div>

            <div className="row mb-quill-div pd-quill-div">
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        style={{ backgroundImage: reactive.translations[language].power_image_src_new, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                        onClick={() => window.addPowerSymbol()}>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        style={{ backgroundImage: reactive.translations[language].frac_image_src_new, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                        onClick={() => window.addFracSymbol()}>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        style={{ backgroundImage: reactive.translations[language].sqrt_image_src_new, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                        onClick={() => window.addSqrtSymbol()}>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        style={{ backgroundImage: reactive.translations[language].cubic_image_src_new, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                        onClick={() => window.addNthRootSymbol()}>
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addLeftParenthesesSymbol()}>
                        {reactive.translations[language]["left_parentheses"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="upper-quill-button"
                        onClick={() => window.addRightParenthesesSymbol()}>
                        {reactive.translations[language]["right_parentheses"]}
                    </button>
                </div>
            </div>

            <div className="row mb2-quill-div pd-quill-div">
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addAlphaSymbol()}>
                        {reactive.translations["general"]["alpha"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addBetaSymbol()}>
                        {reactive.translations["general"]["beta"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addGammaSymbol()}>
                        {reactive.translations["general"]["gamma"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addThetaSymbol()}>
                        {reactive.translations["general"]["theta"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addEpsilonSymbol()}>
                        {reactive.translations["general"]["epsilon"]}
                    </button>
                </div>
                <div className="col-sm-2 flex-center">
                    <button className="alpha-quill-button"
                        onClick={() => window.addInfinitySymbol()}>
                        {reactive.translations["general"]["infinity"]}
                    </button>
                </div>
            </div>

            <div className="row mb-quill-div">
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(7)}>
                        {reactive.translations[language]["seven"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(8)}>
                        {reactive.translations[language]["eight"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(9)}>
                        {reactive.translations[language]["nine"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addPlusSign()}>
                        +
                            </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        style={{ backgroundImage: reactive.translations[language].off_image_src_new, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                        onClick={() => window.$("#" + containerId).css({ display: "none" })}>
                    </button>
                </div>
            </div>

            <div className="row mb-quill-div">
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(4)}>
                        {reactive.translations[language]["four"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(5)}>
                        {reactive.translations[language]["five"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(6)}>
                        {reactive.translations[language]["six"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addMinusSign()}>
                        -
                            </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button orange-quill-button"
                        style={{ color: "orange" }}
                        onClick={() => window.clearQuillKeyboard()}>
                        C
                            </button>
                </div>
            </div>

            <div className="row mb-quill-div">
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(1)}>
                        {reactive.translations[language]["one"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(2)}>
                        {reactive.translations[language]["two"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(3)}>
                        {reactive.translations[language]["three"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addCdotSign()}>
                        X
                            </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addPMSign()}>
                        {reactive.translations["general"]["pm"]}
                    </button>
                </div>
            </div>

            <div className="row mb-quill-div">
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addNumber(0)}>
                        {reactive.translations[language]["zero"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addCommaSymbol()}>
                        {reactive.translations[language]["dot"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addPiSymbol()}>
                        {reactive.translations[language]["pi"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        onClick={() => window.addFracSymbol()}>
                        {reactive.translations["general"]["division"]}
                    </button>
                </div>
                <div className="qwd-20 flex-center fl-quill-div">
                    <button className="number-quill-button"
                        style={{ background: "#1F1B1B", color: "white" }}
                        onClick={() => window.addEqualSign()}>
                        =
                            </button>
                </div>
            </div>
        </div>
        }
        </>
    )
}
export default MathWidgets