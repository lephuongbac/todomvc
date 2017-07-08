
import * as b from 'bobril';
import * as f from 'bobflux';
import { ITodo } from './../state';
import { input } from './../../components/gui';
import * as todoAction from './../actions/todo';

export default f.createComponent<ITodo>({
    render(ctx: f.IContext<ITodo>, me: b.IBobrilNode) {
        me.children = createContent(ctx.state);
        me.tag = 'header';
        b.style(me, headerStyle);
    }
});

export interface IData {
    value?: b.IBobrilChildren;
}

function createContent(todo: ITodo): b.IBobrilNode[] {
    let headerLabel: b.IBobrilNode = {
        tag: 'h1',
        children: 'todos'
    };
    return [
        headerLabel,
        input({
            placeholder: 'What needs to be done?',
            onChange: todoAction.updateNewTodoName,
            value: todo.name,
            onEnter: todoAction.addTodo
        })
    ]
}

const headerStyle = b.styleDef('header');
