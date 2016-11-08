import * as f from 'bobflux';
import * as s from './state';
export const rootKey = 'todos';

export const rootCursor: f.ICursor<s.ITodosState> = {
    key: rootKey
}

export const editedTodoCursor: f.ICursor<s.ITodo> = {
    key: rootKey + '.editedTodo'
}

export const todosCursor: f.ICursor<s.ITodo[]> = {
    key: rootKey + '.todos'
}