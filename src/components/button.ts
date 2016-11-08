import * as b from 'bobril';

export default b.createComponent<IButtonData>({
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.tag = 'button';
        me.children = ctx.data.value;
    },
    onClick(ctx: IButtonCtx): boolean {
        ctx.data.onClick && ctx.data.onClick();
        return true;
    }
});

export interface IButtonData {
    value?: string;
    onClick: () => void;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IButtonData;
}