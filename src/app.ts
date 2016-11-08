import * as b from 'bobril';
import * as g from 'bobril-g11n';
import * as todo from './todo/page';
import * as s from './state';
import * as c from './cursor';
import * as f from 'bobflux';

interface IPageCtx extends b.IBobrilCtx {
    counter: number;
}

b.asset('node_modules/todomvc-app-css/index.css');

f.bootstrap(s.createDefaultApplicationState(), (message, params) => { });

b.routes(
    b.route(
        {
            url: '/',
            handler: todo.create(c.todosCursor)
        }
    )
);