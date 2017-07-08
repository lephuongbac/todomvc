import * as b from 'bobril';
import * as todo from './todo/page';
import * as s from './state';
import * as c from './state.cursors';
import * as f from 'bobflux';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './todo/constants';

b.asset('node_modules/todomvc-app-css/index.css');

f.bootstrap(s.createDefaultApplicationState());

b.routes(
    b.route(
        {
            url: '/',
            handler: todo.createMainPage
        },
        [
            b.route({
                url: '/active',
                name: 'todoActive',
                handler: todo.create(c.todosCursor),
                data: {
                    nowShowing: ACTIVE_TODOS
                }
            }),
            b.route({
                url: '/completed',
                name: 'todoCompleted',
                handler: todo.create(c.todosCursor),
                data: {
                    nowShowing: COMPLETED_TODOS
                }
            }),
            b.routeDefault({
                name: 'default',
                handler: todo.create(c.todosCursor),
                data: {
                    nowShowing: ALL_TODOS
                }
            })
        ]
    )
);