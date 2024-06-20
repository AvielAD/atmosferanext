import { DateTime } from "luxon";


export const FormatDateMed = (dateToFormat: Date)=>{
    return DateTime.fromISO(dateToFormat.toISOString()).toLocaleString(DateTime.DATE_MED)
}