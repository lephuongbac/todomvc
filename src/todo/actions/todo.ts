import * as f from 'bobflux';
import * as s from '../state';
import * as c from '../state.cursors';
import { Utils } from '../utils';

const storeKey = 'todomvc';

export let restoreTodo = f.createParamLessAction<s.ITodosState>(c.rootCursor, (state) =>
    f.shallowCopy(state, (section) => {
        section.todos = Utils.store(storeKey);
    })
);

export let updateNowShowing = f.createAction<s.ITodosState, string>(c.rootCursor, (state, nowShowing) => {
    return { ...state, nowShowing };
});

export let addTodo = f.createParamLessAction<s.ITodosState>(c.rootCursor, (state) => {
    let newState = f.shallowCopy(state);
    let name = newState.editedTodo.name.trim();
    if (name) {
        newState.todos = [
            { id: new Date().getTime(), isDone: false, name: newState.editedTodo.name.trim() },
            ...newState.todos
        ];
        newState.editedTodo = { id: 0, name: '', isDone: false };
        Utils.store(storeKey, newState.todos);
    }
    return newState;
});

export let updateNewTodoName = f.createAction<s.ITodo, string>(c.editedTodoCursor, (todo, name) => {
    return { ...todo, name };
});

export let removeTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    return todos.filter(t => t.id !== id);
});

export let checkTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    let newTodos = todos.map(t => {
        if (t.id === id) {
            return { ...t, isDone: !t.isDone };
        }
        return t;
    });
    Utils.store(storeKey, newTodos);
    return newTodos;
});

export let toggleTodo = f.createAction<s.ITodo[], boolean>(c.todosCursor, (todos, checked) => {
    let newTodos = todos.map(t => {
        return { ...t, isDone: checked };
    });
    Utils.store(storeKey, newTodos);
    return newTodos;
});

export let clearCompleted = f.createParamLessAction<s.ITodo[]>(c.todosCursor, (todos) => {
    let newTodos = todos.filter(t => {
        return !t.isDone;
    });
    Utils.store(storeKey, newTodos);
    return newTodos;
});