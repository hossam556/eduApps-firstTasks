export default function ToLatex(j, lang) {
    let language = lang === null ? localStorage.getItem("language") : lang;
    if(language === undefined || language === null || language == "en")return "\\("+j+"\\)";
    return "\\(\\alwaysar{"+j+"}\\)";
}