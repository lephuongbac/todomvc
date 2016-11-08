import * as f from 'bobflux';

export interface ITodosState extends f.IRouteComponentState {
    editedTodo: ITodo;
    todos: ITodo[];
}

export interface ITodo extends f.IComponentState {
    id: number;
    isDone: boolean;
    name: string;
}

export const createDefaultTodosState = (): ITodosState => {
    return {
        editedTodo: { id: null, name: '', isDone: false },
        todos: [
        ]
    }
}

export const createDefaultTodo = (): ITodo => {
    return { id: 0, name: null, isDone: false };
}