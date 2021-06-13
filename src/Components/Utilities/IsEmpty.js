export default function IsEmpty (data) {
    if (data === undefined || data === null || (
        (typeof (data) === "number" && Number.isNaN(data))
        || (typeof (data) === "string" && data.replace(/\s/g, "") === "")
    )) return true;
    return false;
}