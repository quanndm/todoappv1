export enum modalType {
    NOTHING = 0,
    CREATE_TASK = 1,
    DETAIL_TASK = 2
}

export enum CategoryEnum{
    URGEN = "URGEN",
    DELEGATE = "DELEGATE",
    SCHEDULE = "SCHEDULE",
    LATELY = "LATELY"
}

export enum Theme{
    DAY = 1,
    NIGHT = 0
}
export interface Todo {
    id?: string,
    title: string,
    content : string,
    isDone: boolean,
    category: CategoryEnum
    date_created: string
}
export type TodoState = {
    data : Todo[],
    status: "success" | "error" | "nothing" | "loading",
    error?: string,
    todo?: Todo
};

export type ModalProps = {
    open: boolean,
    type: modalType
    id ?: string
}

