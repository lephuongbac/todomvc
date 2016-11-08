import * as b from 'bobril';
import * as f from 'bobflux';
import * as state from './state';
import {default as todoList} from './todoList';
import {default as todoItem} from './todoItem';
import {default as toggleCheckbox} from './toggleCheckbox';
import * as todoAction from './actions/todo';

export interface IData {
    value?: b.IBobrilChildren;
}

export default f.createComponent<state.ITodosState>({
    render(ctx: f.IContext<state.ITodosState>, me: b.IBobrilNode) {
        me.tag = 'section';
        me.children = createMain(ctx.state.todos);
        b.style(me, mainStyle);
    }
});

const mainStyle = b.styleDef('main');

function createMain(todos: state.ITodo[]): b.IBobrilNode[] {
    return [
        toggleCheckbox({
            value: 'a',
            onClick: todoAction.toggleTodo
        }),
        todoList({
            value: todos.map(item => {
                return todoItem({
                    value: item.name,
                    isChecked: item.isDone,
                    onCheck: () => {
                        todoAction.checkTodo(item.id);
                    },
                    onDelete: () => {
                        todoAction.removeTodo(item.id);
                    }
                });
            })
        })
    ]
}