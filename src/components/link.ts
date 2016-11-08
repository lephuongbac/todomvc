import * as b from 'bobril';

export default b.createComponent<IButtonData>({
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.children = ctx.data.label;
        me.tag = 'a';
        me.attrs = {
            href: ctx.data.label
        };
    }
});

export interface IButtonData {
    label: string;
    link: string;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IButtonData;
}