import Shuffle from './Shuffle'

export default function Sample(start, end, length) {
    if (end < start) {
        start = start + end;
        end = start - end;
        start = start - end;
    }
    let sampleArray = [], resultArray = [];
    for (let i = start; i <= end; i++) sampleArray.push(i)
    if(length > sampleArray.length)length = sampleArray.length;
    if(length < 1)length = 1;
    sampleArray = Shuffle(sampleArray);
    for(let i = 0;i < length;i++)resultArray.push(sampleArray[i]);
    if(length === 1)return resultArray[0];
    return resultArray;
}