import { response } from "../response/response";

export interface adddto{
    close: Function,
}

export interface addDatadto{
    showModal: boolean,
    triggerToast: boolean
    serverresponse: response
}

export interface addDataPropsFormDto{
    dataform: addDatadto,
    close: Function,
}

export interface dataFormsDto{
    showModal: boolean,
    triggerToast: boolean
    close: Function,
    children: string | JSX.Element | null,
    serverresponse: response
}

export interface dataFormsModalDto{
    showModal: boolean,
    close: Function,
    children: string | JSX.Element | null,
}