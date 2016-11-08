import * as f from 'bobflux';
import * as s from '../state';
import * as c from '../cursor';

export let addTodo = f.createAction<s.ITodosState, any>(c.rootCursor, (state) =>
    f.shallowCopy(state, (section) => {
        section.todos = [
            { id: new Date().getTime(), isDone: false, name: section.editedTodo.name },
            ...section.todos
        ];
        section.editedTodo = { id: null, name: '', isDone: false };
    })
);

export let updateNewTodoName = f.createAction<s.ITodo, string>(c.editedTodoCursor, (todo, name) =>
    f.shallowCopy(todo, (t) => {
        t.name = name;
    })
);

export let removeTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    return [...todos.filter(t => t.id !== id)];
});

export let checkTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    return [...todos.map(t => {
        if (t.id === id) {
            t.isDone = !t.isDone;
        }
        return t;
    })];
});

export let toggleTodo = f.createAction<s.ITodo[], any>(c.todosCursor, (todos) => {
    return [...todos.map(t => {
        t.isDone = true;
        return t;
    })];
});

export let clearCompleted = f.createAction<s.ITodo[], any>(c.todosCursor, (todos) => {
    return todos.filter(t => {
        return !t.isDone;
    });
});