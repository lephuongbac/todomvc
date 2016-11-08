import * as b from 'bobril';
import * as f from 'bobflux';
import * as state from './state';
import { default as header } from './header';
import { default as footer } from './footer';
import { default as main } from './main';
import * as c from './cursor';

export let create = f.createRouteComponent<state.ITodosState, any>({
    render(ctx: f.IContext<state.ITodosState>, me: b.IBobrilNode, _oldMe?: b.IBobrilCacheNode): void {
        let contents = [
            headerFactory()
        ];
        ctx.state.todos.length && contents.push(mainFactory());
        ctx.state.todos.length && contents.push(footerFactory());
        me.tag = 'section';
        me.children = contents;
        b.style(me, todoAppStyle);
    }
});

const headerFactory = header(c.editedTodoCursor);
const mainFactory = main(c.todosCursor);
const footerFactory = footer(c.todosCursor);

const todoAppStyle = b.styleDef('todoapp');