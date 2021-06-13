import IsEmpty from './IsEmpty'
export default function CompareResults(actual, expected) {
    if(IsEmpty(actual))return "empty";
    return actual === expected ? "correct" : "wrong";
}