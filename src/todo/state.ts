import * as f from 'bobflux';
import { ALL_TODOS } from './constants';

export interface ITodosState extends f.IRouteComponentState {
    editedTodo: ITodo;
    nowShowing: string;
    todos: ITodo[];
}

export interface ITodo extends f.IComponentState {
    id: number;
    isDone: boolean;
    name: string;
}

export const createDefaultTodosState = (): ITodosState => {
    return {
        nowShowing: ALL_TODOS,
        editedTodo: { id: null, name: '', isDone: false },
        todos: [
        ]
    }
}

export const createDefaultTodo = (): ITodo => {
    return { id: 0, name: null, isDone: false };
}