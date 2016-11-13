import * as b from 'bobril';
import * as f from 'bobflux';
import * as state from './state';
import { default as todoList } from './todoList';
import { default as todoItem } from './todoItem';
import { default as toggleCheckbox } from './toggleCheckbox';
import * as todoAction from './actions/todo';
import { ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

export interface IData {
    value?: b.IBobrilChildren;
}

export default f.createComponent<state.ITodosState>({
    render(ctx: f.IContext<state.ITodosState>, me: b.IBobrilNode) {
        me.tag = 'section';
        me.children = createMain(ctx.state.todos, ctx.state.nowShowing);
        b.style(me, mainStyle);
    }
});

const mainStyle = b.styleDef('main');

function createMain(todos: state.ITodo[], nowShowing: string): b.IBobrilNode[] {
    let shownTodos = todos.filter((todo) => {
        switch (nowShowing) {
            case ACTIVE_TODOS:
                return !todo.isDone;
            case COMPLETED_TODOS:
                return todo.isDone;
            default:
                return true;
        }
    });
    let activeTodoCount = todos.reduce(
        function(accum, todo) {
            return todo.isDone ? accum : accum + 1;
        },
        0
    );
    return [
        toggleCheckbox({
            onChange: todoAction.toggleTodo,
            isChecked: activeTodoCount === 0
        }),
        todoList({
            value: shownTodos.map(item => {
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
    ];
}