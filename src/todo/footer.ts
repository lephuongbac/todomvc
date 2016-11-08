import * as b from 'bobril';
import * as f from 'bobflux';
import { ITodo } from './state';
import { link, button } from './../components/gui';
import * as todoAction from './actions/todo';

export default f.createComponent<ITodo[]>({
    render(ctx: f.IContext<ITodo[]>, me: b.IBobrilNode) {
        let todos = ctx.state;
        let activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.isDone ? accum : accum + 1;
        }, 0);

        me.tag = 'footer';
        me.children = [
            createCount(activeTodoCount),
            createFilters(),
            createClearButton()
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
    }
    return b.style(countLabel, countStyle);
}

function createFilters(): b.IBobrilNode {
    let filter: b.IBobrilNode = {
        tag: 'ul',
        children: [
            createLink('All', '#/'),
            createLink('Active', '#/active'),
            createLink('Completed', '#/completed')
        ]
    }
    return b.style(filter, filterStyle);
}

function createLink(label: string, url: string): b.IBobrilNode {
    return {
        tag: 'li',
        children: link({
            label: label,
            link: url
        })
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
    )
}


const footerStyle = b.styleDef('footer');
const countStyle = b.styleDef('todo-count');
const filterStyle = b.styleDef('filters');
const clearButtonStyle = b.styleDef('clear-completed');
