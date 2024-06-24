import { DateTime } from "luxon";


export const FormatDateMed = (dateToFormat: Date)=>{
    console.log(dateToFormat.toString())
    return DateTime.fromISO(dateToFormat.toISOString()).toLocaleString(DateTime.DATE_MED)
}

export const FormatDateNotIso= (dateToFormat: Date) =>{
    return DateTime.fromISO(dateToFormat.toString()).toLocaleString(DateTime.DATE_MED)
}