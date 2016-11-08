import * as b from 'bobril';
import * as g from 'bobril-g11n';
import * as todo from './todo/page';
import * as s from './state';
import * as c from './cursor';
import * as f from 'bobflux';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './todo/constants';

interface IPageCtx extends b.IBobrilCtx {
    counter: number;
}

b.asset('node_modules/todomvc-app-css/index.css');

f.bootstrap(s.createDefaultApplicationState(), (message, params) => { });

b.routes(
    b.route(
        {
            url: '/',
            handler: todo.create(c.todosCursor),
            data: {
                nowShowing: ALL_TODOS
            }
        },
        [
            {
                url: '/active',
                name: 'todoActive',
                handler: todo.create(c.todosCursor),
                data: {
                    nowShowing: ACTIVE_TODOS
                }
            },
            {
                url: '/completed',
                name: 'todoCompleted',
                handler: todo.create(c.todosCursor),
                data: {
                    nowShowing: COMPLETED_TODOS
                }
            }
        ]
    )
);