import * as b from 'bobril';

export interface IData {
    value: string;
    onClick?: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'checkbox',
            value: ctx.data.value
        };
        b.style(me, checkboxStyle);
    },
    onClick(ctx: ICtx) {
        ctx.data.onClick && ctx.data.onClick();
        return true;
    }
});

const checkboxStyle = b.styleDef('toggle-all');