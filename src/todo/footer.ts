import * as b from 'bobril';
import * as f from 'bobflux';
import { ITodosState } from './state';
import { link, button } from './../components/gui';
import * as todoAction from './actions/todo';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

export default f.createComponent<ITodosState>({
    render(ctx: f.IContext<ITodosState>, me: b.IBobrilNode) {
        let todos = ctx.state.todos;
        let activeTodoCount = todos.reduce(
            function (accum, todo) {
                return todo.isDone ? accum : accum + 1;
            },
            0
        );
        let completedCount = todos.length - activeTodoCount;

        me.tag = 'footer';
        me.children = [
            createCount(activeTodoCount),
            createFilters(ctx.state),
            completedCount && createClearButton()
        ];
        b.style(me, footerStyle);
    }
});

function createCount(count: number): b.IBobrilNode {
    let countLabel: b.IBobrilNode = {
        tag: 'span',
        children: [
            { tag: 'strong', children: count },
            { tag: 'span', children: ' ' },
            { tag: 'span', children: count === 1 ? 'item' : 'items' },
            { tag: 'span', children: ' left' }
        ]
    };
    return b.style(countLabel, countStyle);
}

function createFilters(state: ITodosState): b.IBobrilNode {
    let filter: b.IBobrilNode = {
        tag: 'ul',
        children: [
            createLink('All', '', state.nowShowing === ALL_TODOS),
            createLink('Active', 'todoActive', state.nowShowing === ACTIVE_TODOS),
            createLink('Completed', 'todoCompleted', state.nowShowing === COMPLETED_TODOS)
        ]
    };
    return b.style(filter, filterStyle);
}

function createLink(label: string, url: string, isSelected?: boolean): b.IBobrilNode {
    let linkNode: b.IBobrilNode = link({
            label: label,
            link: url
        });
    return {
        tag: 'li',
        children: isSelected ? b.style(linkNode, selectedStyle) : linkNode
    };
}

function createClearButton(): b.IBobrilNode {
    return b.style(
        button(
            {
                value: 'Clear completed',
                onClick: () => {
                    todoAction.clearCompleted();
                }
            }
        ),
        clearButtonStyle
    );
}

const footerStyle = b.styleDef('footer');
const countStyle = b.styleDef('todo-count');
const filterStyle = b.styleDef('filters');
const clearButtonStyle = b.styleDef('clear-completed');
const selectedStyle = b.styleDef('selected');