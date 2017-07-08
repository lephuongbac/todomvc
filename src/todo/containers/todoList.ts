import * as b from 'bobril';

export interface IData {
    value?: b.IBobrilChildren;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'ul';
        me.children = ctx.data.value;
        b.style(me, todoListStyle);
    }
});

const todoListStyle = b.styleDef('todo-list');