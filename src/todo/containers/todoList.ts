import * as b from 'bobril';

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'ul';
        me.children = ctx.data.value;
        b.style(me, todoListStyle);
    }
});

export interface IData {
    value?: b.IBobrilChildren;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

const todoListStyle = b.styleDef('todo-list');