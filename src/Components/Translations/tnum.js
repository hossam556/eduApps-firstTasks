export default function tnum(number, mj = false, language = null) {
    if (language === null) language = getLanguage();
    number = number.toString();
    if (mj == true && number.length == 1) return number;
    let rnumber = "";
    for (let i = 0; i < number.length; i++) {
        rnumber += mapNumber(number[i], language)
    }
    if (language == "ar") {
        if (mj == true) {
            if (number[0] == "-") rnumber = rnumber.substring(1) + "-";
            rnumber = rnumber.split(',').join("\\transs{.}{,}");
            rnumber = "\\alwaysar{" + rnumber + "}"
        }
    }
    return rnumber;
}
function getLanguage() {
    let language = localStorage.getItem("language");
    if (language === undefined || language === null) {
        language = "en";
    }
    return language;
}
function mapNumber(char, language) {
    if (language == "ar") {
        if (char == "0") char = "٠";
        else if (char == "1") char = "١";
        else if (char == "2") char = "٢";
        else if (char == "3") char = "٣";
        else if (char == "4") char = "٤";
        else if (char == "5") char = "٥";
        else if (char == "6") char = "٦";
        else if (char == "7") char = "٧";
        else if (char == "8") char = "٨";
        else if (char == "9") char = "٩";
        else if (char == ".") char = ",";
    }
    else {
        if (char == "٠") char = "0";
        else if (char == "١") char = "1";
        else if (char == "٢") char = "2";
        else if (char == "٣") char = "3";
        else if (char == "٤") char = "4";
        else if (char == "٥") char = "5";
        else if (char == "٦") char = "6";
        else if (char == "٧") char = "7";
        else if (char == "٨") char = "8";
        else if (char == "٩") char = "9";
        else if (char == ",") char = ".";
    }
    return (char)
}