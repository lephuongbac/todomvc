import * as b from 'bobril';
import * as f from 'bobflux';
import * as state from './state';
import { default as header } from './header';
import { default as footer } from './footer';
import { default as main } from './main';
import * as c from './cursor';
import * as todoAction from './actions/todo';

export let createMainPage = b.createComponent({
    init(ctx: b.IBobrilCtx): void {
        todoAction.restoreTodo();
    },
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode, _oldMe?: b.IBobrilCacheNode): void {
        me.tag = 'section';
        me.children = [
            headerFactory(),
            me.data.activeRouteHandler()
        ];
        b.style(me, todoAppStyle);
    }
});

export let create = f.createRouteComponent<state.ITodosState, any>({
    init(ctx: f.IContext<state.ITodosState>): void {
        todoAction.updateNowShowing(ctx.data.nowShowing);
    },
    render(ctx: f.IContext<state.ITodosState>, me: b.IBobrilNode, _oldMe?: b.IBobrilCacheNode): void {
        me.children = [
            !!ctx.state.todos.length && mainFactory(),
            !!ctx.state.todos.length && footerFactory()
        ];
    }
});

const headerFactory = header(c.editedTodoCursor);
const mainFactory = main(c.rootCursor);
const footerFactory = footer(c.rootCursor);

const todoAppStyle = b.styleDef('todoapp');