import * as f from 'bobflux';
import * as s from '../state';
import * as c from '../cursor';
import { Utils } from '../utils';


export let restoreTodo = f.createAction<s.ITodosState, any>(c.rootCursor, (state) =>
    f.shallowCopy(state, (section) => {
        section.todos = Utils.store('todomvc');
    })
);

export let addTodo = f.createAction<s.ITodosState, any>(c.rootCursor, (state) => {
    let newState = f.shallowCopy(state);
    newState.todos = [
        { id: new Date().getTime(), isDone: false, name: newState.editedTodo.name },
        ...newState.todos
    ];
    newState.editedTodo = { id: null, name: '', isDone: false };
    Utils.store('todomvc', newState.todos);
    return newState;
});

export let updateNewTodoName = f.createAction<s.ITodo, string>(c.editedTodoCursor, (todo, name) =>
    f.shallowCopy(todo, (t) => {
        t.name = name;
    })
);

export let removeTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    return [...todos.filter(t => t.id !== id)];
});

export let checkTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    let newTodos = [...todos.map(t => {
        if (t.id === id) {
            t.isDone = !t.isDone;
        }
        return t;
    })];
    Utils.store('todomvc', newTodos);
    return newTodos;
});

export let toggleTodo = f.createAction<s.ITodo[], any>(c.todosCursor, (todos) => {
    let newTodos = [...todos.map(t => {
        t.isDone = true;
        return t;
    })];
    Utils.store('todomvc', newTodos);
    return newTodos;
});

export let clearCompleted = f.createAction<s.ITodo[], any>(c.todosCursor, (todos) => {
    let newTodos = todos.filter(t => {
        return !t.isDone;
    });
    Utils.store('todomvc', newTodos);
    return newTodos;
});