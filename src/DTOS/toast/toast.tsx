export interface toastpersonal{
    show: boolean,
    close: Function
}

export interface datainfo{
    succeeded: boolean,
    message: boolean
}

export interface toastdatadto{
    show: boolean,
    close: Function,
    serverresponse: serverresponse
}

export interface toastdatapropsdto{
    show: boolean,
    close: Function,
    serverresponse: serverresponse
}
interface serverresponse{
    message: string,
    succeeded: boolean
}