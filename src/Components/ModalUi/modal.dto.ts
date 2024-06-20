export interface ModalUi{
    showModal: boolean,
    close: Function,
    children: string | JSX.Element | null,
}