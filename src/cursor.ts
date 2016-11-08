import * as s from './state';
import * as todoState from './todo/state';
import * as f from 'bobflux';

export const rootKey = f.rootCursor.key;

export const rootCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export const todosCursor: f.ICursor<todoState.ITodosState> = {
    key: 'todos'
}
