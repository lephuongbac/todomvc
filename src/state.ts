import * as f from 'bobflux';
import { ITodosState, createDefaultTodosState } from './todo/state';

export interface IApplicationState extends f.IRouteComponentState {
    todos: ITodosState;
}

export const createDefaultApplicationState = (): IApplicationState => {
    return {
        todos: createDefaultTodosState()
    };
}

